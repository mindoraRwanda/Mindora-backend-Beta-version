import { Request, Response, NextFunction } from "express";
import UserExerciseResponse from "../database/models/userExerciseResponse";
import UserExercise from "../database/models/userExercises";
import ExerciseQuestion from "../database/models/exerciseQuestion";
import { Op } from "sequelize";

enum Status {
  Pending = "Pending",
  Completed = "Completed",
  InProgress = "InProgress",
}

enum QuestionStatus {
  Passed = "passed",
  Failed = "failed",
}
// Create a user exercise response
export const createUserExerciseResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userExerciseId, questionId, response } = req.body;

    if (!userExerciseId || !questionId || !response) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const [question, userExercise] = await Promise.all([
      ExerciseQuestion.findByPk(questionId),
      UserExercise.findByPk(userExerciseId),
    ]);
    console.log("user exercise id:", userExercise?.exerciseId);
    if (!question || !userExercise) {
      return res
        .status(404)
        .json({ message: "Exercise question or user exercise not found" });
    }

    let isCorrect = question.correctAnswer === response;
    console.log("isCorrect:", isCorrect);
    const pointsToAdd = isCorrect ? question.points : 0;
    console.log("points:", pointsToAdd);
    // Calculate new score and progress
    const totalExercisePoints = await ExerciseQuestion.sum("points", {
      where: { exerciseId: { [Op.eq]: userExercise?.exerciseId } },
    });
    // const totalExercisePoints = await ExerciseQuestion.sum("points");
    console.log("total points:", totalExercisePoints);
    const newExerciseScore = userExercise.score + pointsToAdd;
    console.log("new score:", newExerciseScore);
    const newProgress = (newExerciseScore / totalExercisePoints) * 100;

    console.log("progress", newProgress);

    // Update user exercise status
    let newExerciseStatus: Status = Status.Pending;
    let completedAt: Date | undefined = undefined;
    if (newExerciseScore === totalExercisePoints) {
      newExerciseStatus = Status.Completed;
      completedAt = new Date();
    } else if (userExercise.status === Status.Pending || newExerciseScore > 0) {
      newExerciseStatus = Status.InProgress;
    }

    await userExercise.update({
      score: newExerciseScore,
      progress: newProgress,
      status: newExerciseStatus,
      completedAt,
    });

    // Update question status
    const questionStatus = isCorrect
      ? QuestionStatus.Passed
      : QuestionStatus.Failed;
    await question.update({ status: questionStatus });

    // Create user exercise response
    const userExerciseResponse = await UserExerciseResponse.create({
      userExerciseId,
      questionId,
      response,
      isCorrect,
    });

    res.status(201).json(userExerciseResponse);
  } catch (error) {
    next(error);
  }
};

// Get all user exercise responses
export const getUserExerciseResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userExerciseResponses = await UserExerciseResponse.findAll({
      include: { model: UserExercise, as: "user_exercise" },
    });
    if (userExerciseResponses) {
      return res.status(200).json(userExerciseResponses);
    } else {
      return res
        .status(404)
        .json({ message: "User exercise responses not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a user exercise response by its ID
export const getUserExerciseResponseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const userExerciseResponse = await UserExerciseResponse.findByPk(id, {
      include: { model: UserExercise, as: "user_exercise" },
    });

    if (userExerciseResponse) {
      return res.status(200).json(userExerciseResponse);
    } else {
      return res
        .status(404)
        .json({ message: "User exercise response not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a user exercise response
export const updateUserExerciseResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { userExerciseId, questionId, response } = req.body;

    if (!id || !userExerciseId || !questionId || !response) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const [question, userExercise, userExerciseResponse] = await Promise.all([
      ExerciseQuestion.findByPk(questionId),
      UserExercise.findByPk(userExerciseId),
      UserExerciseResponse.findByPk(id),
    ]);

    if (!question || !userExercise || !userExerciseResponse) {
      return res.status(404).json({
        message:
          "Exercise question, user exercise, or user exercise response not found",
      });
    }

    let isCorrect = question.correctAnswer === response;
    const pointsToAdd = isCorrect ? question.points : 0;

    // Calculate new score and progress
    const totalExercisePoints = await ExerciseQuestion.sum("points", {
      where: { exerciseId: userExercise.exerciseId },
    });
    const newExerciseScore = userExercise.score + pointsToAdd;
    const newProgress = (newExerciseScore / totalExercisePoints) * 100;

    // Update user exercise status
    let newExerciseStatus: Status = Status.Pending;
    let completedAt: Date | undefined = undefined;
    if (newExerciseScore === totalExercisePoints) {
      newExerciseStatus = Status.Completed;
      completedAt = new Date();
    } else if (userExercise.status === Status.Pending) {
      newExerciseStatus = Status.InProgress;
    }

    await userExercise.update({
      score: newExerciseScore,
      progress: newProgress,
      status: newExerciseStatus,
      completedAt,
    });

    // Update question status
    const questionStatus = isCorrect
      ? QuestionStatus.Passed
      : QuestionStatus.Failed;
    await question.update({ status: questionStatus });

    // Update user exercise response
    await userExerciseResponse.update({
      response,
      isCorrect,
    });

    res.status(200).json(userExerciseResponse);
  } catch (error) {
    next(error);
  }
};

// Delete a user exercise response
export const deleteUserExerciseResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const userExerciseResponse = await UserExerciseResponse.findByPk(id);

    if (userExerciseResponse) {
      await userExerciseResponse.destroy();
      return res.status(204).json();
    } else {
      return res
        .status(404)
        .json({ message: "User exercise response not found" });
    }
  } catch (error) {
    next(error);
  }
};
