import { PoolClient } from 'pg';
import pool from '../db';

interface MedicalProfile {
  id?: number;
  userId: string;
  therapyType?: string;
  medicalConditions?: boolean;
  medications?: boolean;
  psychiatricConditions?: boolean;
  psychiatricHospitalization?: boolean;
  familyMentalHealth?: boolean;
  familyMedicalConditions?: boolean;
  symptoms?: string;
  dailyImpact?: string;
  sleepIssues?: boolean;
  appetiteIssues?: boolean;
  energyLevelIssues?: boolean;
  moodChanges?: boolean;
  livingSituation?: string;
  employmentStatus?: string;
  supportSystem?: boolean;
  recentLifeChanges?: boolean;
  substanceUse?: boolean;
  pastSubstanceAbuse?: boolean;
  copingMechanisms?: string;
  strengths?: string;
  thoughtsOfSelfHarm?: boolean;
  pastSuicideAttempt?: boolean;
  currentThoughtsOfSelfHarm?: boolean;
  treatmentGoals?: string;
  treatmentExpectations?: string;
  culturalBeliefs?: boolean;
  religiousBeliefs?: boolean;
  cognitiveIssues?: boolean;
  developmentalHistory?: string;
  legalIssues?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createMedicalProfile = async (profile: MedicalProfile) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO medical_profiles (
        user_id, therapy_type, medical_conditions, medications, psychiatric_conditions, 
        psychiatric_hospitalization, family_mental_health, family_medical_conditions, symptoms, 
        daily_impact, sleep_issues, appetite_issues, energy_level_issues, mood_changes, 
        living_situation, employment_status, support_system, recent_life_changes, substance_use, 
        past_substance_abuse, coping_mechanisms, strengths, thoughts_of_self_harm, past_suicide_attempt, 
        current_thoughts_of_self_harm, treatment_goals, treatment_expectations, cultural_beliefs, 
        religious_beliefs, cognitive_issues, developmental_history, legal_issues
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32
      ) RETURNING *`,
      [
        profile.userId, profile.therapyType, profile.medicalConditions, profile.medications,
        profile.psychiatricConditions, profile.psychiatricHospitalization, profile.familyMentalHealth,
        profile.familyMedicalConditions, profile.symptoms, profile.dailyImpact, profile.sleepIssues,
        profile.appetiteIssues, profile.energyLevelIssues, profile.moodChanges, profile.livingSituation,
        profile.employmentStatus, profile.supportSystem, profile.recentLifeChanges, profile.substanceUse,
        profile.pastSubstanceAbuse, profile.copingMechanisms, profile.strengths, profile.thoughtsOfSelfHarm,
        profile.pastSuicideAttempt, profile.currentThoughtsOfSelfHarm, profile.treatmentGoals, 
        profile.treatmentExpectations, profile.culturalBeliefs, profile.religiousBeliefs, profile.cognitiveIssues,
        profile.developmentalHistory, profile.legalIssues
      ]
    );
    return rows[0];
  } finally {
    client.release();
  }
};

export const getMedicalProfileByUserId = async (userId: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM medical_profiles WHERE user_id = $1`, [userId]);
    return rows[0];
  } finally {
    client.release();
  }
};

export const updateMedicalProfile = async (userId: string, profileData: Partial<MedicalProfile>) => {
  const client: PoolClient = await pool.connect();
  const updateFields = Object.keys(profileData).map((key, index) => `${key} = $${index + 2}`).join(', ');
  const updateValues = Object.values(profileData);
  try {
    const { rows } = await client.query(
      `UPDATE medical_profiles SET ${updateFields}, updated_at = NOW() WHERE user_id = $1 RETURNING *`,
      [userId, ...updateValues]
    );
    return rows[0];
  } finally {
    client.release();
  }
};
