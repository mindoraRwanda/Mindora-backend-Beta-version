import User from "./user";
import Patient from "./patient";
import Therapist from "./therapist";
import Appointment from "./appointment";
import AppointmentAvailableSlots from "./appointmentAvailableSlots";
import AppointmentChange from "./appointmentChanges";
import TreatmentPlanAdjustment from "./treatmentPlanAdjustment";
import TreatmentPlan from "./treatmentPlan";
import TreatmentGoal from "./treatmentGoal";
import TreatmentMilestone from "./treatmentMilestone";
import MilestoneTask from "./milestoneTask";
import ElectronicHealthRecord from "./electronicHealthRecord";
import Chat from "./chat";
import ChatMembers from "./chatMember";
import Message from "./message";
import Medication from "./medication";
import MedicationPrescription from "./medicationPrescription";
import PrescriptionCompliance from "./prescriptionCompliance";
import MedicationRecommendation from "./medicationRecommendation";
import Exercise from "./exercise";
import ExerciseQuestion from "./exerciseQuestion";
import UserExercise from "./userExercises";
import UserExerciseResponse from "./userExerciseResponse";
import Reward from "./reward";
import UserReward from "./userReward";
import SupportCommunity from "./community";
import CommunityPost from "./communityPost";
import Comment from "./comment";
import PostReaction from "./postReaction";
import CommunityModerationAction from "./CommunityModerationAction";
import SymptomLog from "./symptomLog";
import MoodLog from "./moodLog";

export const modelAssociation = async () => {
  // patient association
  User.hasOne(Patient, {
    foreignKey: "userId",
    as: "patient",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Patient.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  // therapist association
  User.hasOne(Therapist, {
    foreignKey: "userId",
    as: "therapist",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Therapist.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // appointment association
  Therapist.hasMany(Appointment, {
    foreignKey: "therapistId",
    as: "appointments",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Appointment.belongsTo(Therapist, {
    foreignKey: "therapistId",
    as: "therapist",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Patient.hasMany(Appointment, {
    foreignKey: "patientId",
    as: "appointments",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Appointment.belongsTo(Patient, {
    foreignKey: "patientId",
    as: "patient",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // appointment association
  Therapist.hasMany(AppointmentAvailableSlots, {
    foreignKey: "therapistId",
    as: "slots",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  AppointmentAvailableSlots.belongsTo(Therapist, {
    foreignKey: "therapistId",
    as: "therapist",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  // appointment changes association
  User.hasMany(AppointmentChange, {
    foreignKey: "actionBy",
    as: "appointment_change",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  AppointmentChange.belongsTo(User, {
    foreignKey: "actionBy",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // treatment plan
  Patient.hasMany(TreatmentPlan, {
    foreignKey: "patientId",
    as: "treatment_plans",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  TreatmentPlan.belongsTo(Patient, {
    foreignKey: "patientId",
    as: "patient",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Therapist.hasMany(TreatmentPlan, {
    foreignKey: "therapistId",
    as: "treatment_plans",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  TreatmentPlan.belongsTo(Therapist, {
    foreignKey: "therapistId",
    as: "therapist",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  // treatment plan adjustment
  TreatmentPlan.hasMany(TreatmentPlanAdjustment, {
    foreignKey: "treatmentPlanId",
    as: "adjustments",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  TreatmentPlanAdjustment.belongsTo(TreatmentPlan, {
    foreignKey: "treatmentPlanId",
    as: "treatment_plan",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Therapist.hasMany(TreatmentPlanAdjustment, {
    foreignKey: "modifiedBy",
    as: "treatment_plan_adjustments",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  TreatmentPlanAdjustment.belongsTo(Therapist, {
    foreignKey: "modifiedBy",
    as: "therapist",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // treatment plan goal
  TreatmentPlan.hasMany(TreatmentGoal, {
    foreignKey: "treatmentPlanId",
    as: "goals",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  TreatmentGoal.belongsTo(TreatmentPlan, {
    foreignKey: "treatmentPlanId",
    as: "treatment_plan",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // treatment Goal milestones
  TreatmentGoal.hasMany(TreatmentMilestone, {
    foreignKey: "goalId",
    as: "milestones",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  TreatmentMilestone.belongsTo(TreatmentGoal, {
    foreignKey: "goalId",
    as: "goal",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // treatment milestone tasks
  TreatmentMilestone.hasMany(MilestoneTask, {
    foreignKey: "milestoneId",
    as: "tasks",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  MilestoneTask.belongsTo(TreatmentMilestone, {
    foreignKey: "milestoneId",
    as: "milestone",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // electronic health records
  Therapist.hasMany(ElectronicHealthRecord, {
    foreignKey: "therapistId",
    as: "health_records",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  ElectronicHealthRecord.belongsTo(Therapist, {
    foreignKey: "therapistId",
    as: "therapist",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Patient.hasMany(ElectronicHealthRecord, {
    foreignKey: "patientId",
    as: "health_records",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  ElectronicHealthRecord.belongsTo(Patient, {
    foreignKey: "patientId",
    as: "patient",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // chats
  Chat.hasMany(ChatMembers, {
    foreignKey: "chatId",
    as: "participants",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  ChatMembers.belongsTo(Chat, {
    foreignKey: "chatId",
    as: "chat",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  User.hasMany(ChatMembers, {
    foreignKey: "userId",
    as: "chat-members",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  ChatMembers.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Chat.hasMany(Message, {
    foreignKey: "chatId",
    as: "messages",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Message.belongsTo(Chat, {
    foreignKey: "chatId",
    as: "chat",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Message.belongsTo(User, {
    as: "sender",
    foreignKey: "senderId",
  });
  Message.belongsTo(User, {
    as: "receiver",
    foreignKey: "receiverId",
  });

  User.hasMany(Message, {
    as: "conversations",
    foreignKey: "senderId",
  });
  User.hasMany(Message, {
    as: "messages",
    foreignKey: "receiverId",
  });

  // medications and prescriptions
  Medication.hasMany(MedicationPrescription, {
    as: "prescriptions",
    foreignKey: "medicationId",
  });
  MedicationPrescription.belongsTo(Medication, {
    as: "medication",
    foreignKey: "medicationId",
  });

  MedicationPrescription.hasMany(PrescriptionCompliance, {
    as: "prescription_compliances",
    foreignKey: "prescriptionId",
  });
  PrescriptionCompliance.belongsTo(MedicationPrescription, {
    as: "prescription",
    foreignKey: "prescriptionId",
  });

  Patient.hasMany(PrescriptionCompliance, {
    as: "prescription_compliances",
    foreignKey: "patientId",
  });
  PrescriptionCompliance.belongsTo(Patient, {
    as: "patient",
    foreignKey: "patientId",
  });

  Patient.hasMany(MedicationRecommendation, {
    as: "medication_recommendation",
    foreignKey: "patientId",
  });
  MedicationRecommendation.belongsTo(Patient, {
    as: "patient",
    foreignKey: "patientId",
  });

  // exercises
  Exercise.hasMany(ExerciseQuestion, {
    as: "questions",
    foreignKey: "exerciseId",
  });
  ExerciseQuestion.belongsTo(Exercise, {
    as: "exercise",
    foreignKey: "exerciseId",
  });
  // user exercises
  Exercise.hasMany(UserExercise, {
    as: "user_exercises",
    foreignKey: "exerciseId",
  });
  UserExercise.belongsTo(Exercise, {
    as: "exercise",
    foreignKey: "exerciseId",
  });

  User.hasMany(UserExercise, {
    as: "exercises",
    foreignKey: "userId",
  });
  UserExercise.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });

  UserExercise.hasMany(UserExerciseResponse, {
    as: "responses",
    foreignKey: "userExerciseId",
  });
  UserExerciseResponse.belongsTo(UserExercise, {
    as: "user_exercise",
    foreignKey: "userExerciseId",
  });

  // rewards
  Reward.hasMany(UserReward, {
    as: "user_rewards",
    foreignKey: "rewardId",
  });
  UserReward.belongsTo(Reward, {
    as: "reward",
    foreignKey: "rewardId",
  });

  User.hasMany(UserReward, {
    as: "user_rewards",
    foreignKey: "userId",
  });
  UserReward.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });
  // support community
  User.hasMany(SupportCommunity, {
    as: "support_communities",
    foreignKey: "moderatorId",
  });
  SupportCommunity.belongsTo(User, {
    as: "moderator",
    foreignKey: "moderatorId",
  });

  // community posts
  SupportCommunity.hasMany(CommunityPost, {
    as: "posts",
    foreignKey: "communityId",
  });
  CommunityPost.belongsTo(SupportCommunity, {
    as: "community",
    foreignKey: "communityId",
  });

  User.hasMany(CommunityPost, {
    as: "posts",
    foreignKey: "createdBy",
  });
  CommunityPost.belongsTo(User, {
    as: "user",
    foreignKey: "createdBy",
  });
  // comments
  User.hasMany(Comment, {
    as: "post_comments",
    foreignKey: "createdBy",
  });
  Comment.belongsTo(User, {
    as: "user",
    foreignKey: "createdBy",
  });

  CommunityPost.hasMany(Comment, {
    as: "comments",
    foreignKey: "postId",
  });
  Comment.belongsTo(CommunityPost, {
    as: "post",
    foreignKey: "postId",
  });
  Comment.hasMany(Comment, {
    as: "replies",
    foreignKey: "parentCommentId",
  });
  Comment.belongsTo(Comment, {
    as: "parent_comment",
    foreignKey: "parentCommentId",
  });

  Comment.hasMany(PostReaction, {
    as: "reactions",
    foreignKey: "commentId",
  });
  PostReaction.belongsTo(Comment, {
    as: "comment",
    foreignKey: "commentId",
  });

  CommunityPost.hasMany(PostReaction, {
    as: "reactions",
    foreignKey: "postId",
  });
  PostReaction.belongsTo(CommunityPost, {
    as: "post",
    foreignKey: "postId",
  });

  CommunityPost.hasMany(CommunityModerationAction, {
    as: "moderation_actions",
    foreignKey: "postId",
  });
  CommunityModerationAction.belongsTo(CommunityPost, {
    as: "post",
    foreignKey: "postId",
  });

  Comment.hasMany(CommunityModerationAction, {
    as: "moderations",
    foreignKey: "commentId",
  });
  CommunityModerationAction.belongsTo(Comment, {
    as: "comment",
    foreignKey: "commentId",
  });

  User.hasMany(CommunityModerationAction, {
    as: "moderation_actions",
    foreignKey: "actionBy",
  });
  CommunityModerationAction.belongsTo(User, {
    as: "user",
    foreignKey: "actionBy",
  });
  // symptom logging
  User.hasMany(SymptomLog, {
    as: "symptoms",
    foreignKey: "userId",
  });
  SymptomLog.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });
  // mood logging
  User.hasMany(MoodLog, {
    as: "moods",
    foreignKey: "userId",
  });
  MoodLog.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });
};
