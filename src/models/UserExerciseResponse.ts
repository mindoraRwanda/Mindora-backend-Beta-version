// -- Table to store individual responses to exercises
// CREATE TABLE UserExerciseResponses (
//     id SERIAL PRIMARY KEY,
//     user_exercise_id INT REFERENCES UserExercises(id),
//     question_id INT,
//     response TEXT,
//     is_correct BOOLEAN,
//     response_time TIMESTAMP DEFAULT NOW()
// );

interface UserExerciseResponses {
  id: string;
  userExerciseId: string;
  questionId: string;
  response: string;
  isCorrect: boolean;
  responseTime: Date;
}
