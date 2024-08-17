import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createUserExerciseResponse,
  updateExerciseResponse,
  retrieveUserExerciseResponse,
  removeUserExerciseResponse,
} from "../models/UserExerciseResponse";

export const addUserExerciseResponse = async (req: Request, res: Response) => {
  const { userExerciseId, questionId, response, isCorrect, responseTime } =
    req.body;
  if (
    !userExerciseId ||
    !questionId ||
    !response ||
    !isCorrect ||
    !responseTime
  ) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const uniqueId = uuidv4();
    const insertedResponse = await createUserExerciseResponse({
      userExerciseId,
      questionId,
      response,
      isCorrect,
      responseTime,
      id: uniqueId,
    });
    if (!insertedResponse) {
      return res
        .status(500)
        .json({ Error: "Error while registering user exercise response!" });
    }
    return res.status(201).json(insertedResponse);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while registering user exercise response!" });
  }
};

export const updateUserExerciseResponse = async (
  req: Request,
  res: Response
) => {
  const { id, userExerciseId, questionId, response, isCorrect, responseTime } =
    req.body;
  if (
    !id ||
    !userExerciseId ||
    !questionId ||
    !response ||
    !isCorrect ||
    !responseTime
  ) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const updatedResponse = await updateExerciseResponse({
      id,
      userExerciseId,
      questionId,
      response,
      isCorrect,
      responseTime,
    });
    if (!updatedResponse) {
      return res
        .status(404)
        .json({ Error: "Error while updating user exercise response!" });
    }
    return res.status(200).json(updatedResponse);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while updating user exercise response!" });
  }
};

export const getUserExerciseResponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const userResponse = await retrieveUserExerciseResponse(id);
    if (!userResponse) {
      return res
        .status(404)
        .json({ Error: "Error while retrieving user exercise response!" });
    }
    return res.status(200).json(userResponse);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while retrieving user exercise response!" });
  }
};

export const deleteUserExerciseResponse = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const deletedResponse = await removeUserExerciseResponse(id);
    if (!deletedResponse) {
      return res
        .status(404)
        .json({ Error: "Error while deleting user exercise response!" });
    }
    return res.status(200).json(deletedResponse);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while deleting user exercise response!" });
  }
};
