// CREATE TABLE ExerciseQuestions (
//     question_id SERIAL PRIMARY KEY,
//     exercise_id INT REFERENCES Exercises(id),
//     question TEXT,
//     correct_answer TEXT
// );
interface ExerciseQuestions {
  questionId: string;
  exerciseId: string;
  question: string;
  correctAnswer: string;
}
