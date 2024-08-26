import { PoolClient } from 'pg';
import pool from '../db';
import BoxSDK from 'box-node-sdk';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { FileType } from 'file-type';


const boxConfigFile = '../config/box_config.json';
const boxConfig = JSON.parse(fs.readFileSync(boxConfigFile, 'utf8'));
const sdk = BoxSDK.getPreconfiguredInstance(boxConfig);
const boxClient = sdk.getAppAuthClient('enterprise', boxConfig.enterpriseID);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


interface Therapist {
  id: string;
  email: string;
  password: string;
  approved: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  specialization: string;
  experience: number;
  licenseNumber: string;
  diplomaUrl: string;
  licenseUrl: string;
  profilePictureUrl: string;
  bio: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const validateFile = async (file: Buffer): Promise<boolean> => {
  if (file.length > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the maximum limit');
  }

  const fileType = await FileType.fromBuffer(file);
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!fileType || !allowedTypes.includes(fileType.mime)) {
    throw new Error('Invalid file type');
  }

  return true;
};

const uploadToBox = async (fileName: string, fileContent: Buffer): Promise<string> => {
  try {
    const folder = await boxClient.folders.get('0'); // '0' is the root folder
    const file = await boxClient.files.uploadFile({
      name: fileName,
      parent: { id: folder.id },
      contents: fileContent
    });

    const sharedLink = await boxClient.files.update(file.id, {
      shared_link: {
        access: 'open',
        permissions: {
          can_download: true
        }
      }
    });

    return sharedLink.shared_link.url;
  } catch (error) {
    console.error('Error uploading file to Box:', error);
    throw error;
  }
};

const uploadProfilePicture = async (file: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'profile_pictures' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(file);
  });
};

export const createTherapist = async (therapist: Therapist, diplomaFile: Buffer, licenseFile: Buffer, profilePicture: Buffer) => {
  const client: PoolClient = await pool.connect();
  try {
    await validateFile(diplomaFile);
    await validateFile(licenseFile);
    await validateFile(profilePicture);

    const diplomaUrl = await uploadToBox(`diploma_${therapist.email}.pdf`, diplomaFile);
    const licenseUrl = await uploadToBox(`license_${therapist.email}.pdf`, licenseFile);
    const profilePictureUrl = await uploadProfilePicture(profilePicture);

    const { rows } = await client.query(
      `INSERT INTO therapists (
        email, password, approved, first_name, last_name, phone_number,
        specialization, experience, license_number, diploma_url, license_url,
        profile_picture_url, bio
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        therapist.email, therapist.password, therapist.approved,
        therapist.firstName, therapist.lastName, therapist.phoneNumber,
        therapist.specialization, therapist.experience, therapist.licenseNumber,
        diplomaUrl, licenseUrl, profilePictureUrl,
        therapist.bio
      ]
    );
    return rows[0];
  } finally {
    client.release();
  }
};

export const getTherapistByEmail = async (email: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM therapists WHERE email = $1`, [email]);
    return rows[0];
  } finally {
    client.release();
  }
};

export const updateTherapistApproval = async (id: string, approved: boolean) => {
  const client: PoolClient = await pool.connect();
  try {
    console.log(`Updating therapist ${id} approval status to ${approved}`);
    const { rows } = await client.query(
      `UPDATE therapists SET approved = $1 WHERE id = $2 RETURNING *`,
      [approved, id]
    );
    console.log(`Update result: ${JSON.stringify(rows)}`);
    return rows[0];
  } finally {
    client.release();
  }
};