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
import Course from "./course";
import CourseEnrollment from "./courseEnrollment";
import Video from "./video";
import Article from "./article";
import MembershipPlan from "./membershipPlan";
import Subscription from "./subscription";
import SubscriptionChange from "./subscriptionChange";
import SubscriptionLinkedAccount from "./subscriptionLinkedAccount";
import Invoice from "./invoice";
import Payment from "./payment";
import Insurance from "./insurance";
import PatientInsurance from "./patientInsurance";
import Service from "./service";
import InsuranceServiceCoverage from "./insuranceServiceCoverage";
import LanguageSupport from "./languageSupport";
import Translation from "./translation";
import UserCommunity from "./userCommunity";
import UserPreferences from "./userPreferences";
import Role from "./role";
import Permission from "./permission";
import RolePermission from "./rolePermission";
import PostReport from "./postReport";

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

  Appointment.hasMany(AppointmentChange, {
    foreignKey: "appointmentId",
    as: "appointmentChanges",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  AppointmentChange.belongsTo(Appointment, {
    foreignKey: "appointmentId",
    as: "appointment",
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
    as: "changedBy",
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
  // courses and enrollments
  Course.hasMany(CourseEnrollment, {
    as: "enrollments",
    foreignKey: "courseId",
  });
  CourseEnrollment.belongsTo(Course, {
    as: "course",
    foreignKey: "courseId",
  });

  Course.hasMany(Video, {
    as: "videos",
    foreignKey: "courseId",
  });
  Video.belongsTo(Course, {
    as: "course",
    foreignKey: "courseId",
  });
  Course.hasMany(Article, {
    as: "articles",
    foreignKey: "courseId",
  });
  Article.belongsTo(Course, {
    as: "course",
    foreignKey: "courseId",
  });
  // membership plans
  MembershipPlan.hasMany(Subscription, {
    as: "subscriptions",
    foreignKey: "membershipPlanId",
  });
  Subscription.belongsTo(MembershipPlan, {
    as: "membershipPlan",
    foreignKey: "membershipPlanId",
  });

  Subscription.hasMany(SubscriptionChange, {
    as: "changes",
    foreignKey: "subscriptionId",
  });
  SubscriptionChange.belongsTo(Subscription, {
    as: "subscription",
    foreignKey: "subscriptionId",
  });
  // linked accounts
  Subscription.hasMany(SubscriptionLinkedAccount, {
    as: "linkedAccounts",
    foreignKey: "subscriptionId",
  });
  SubscriptionLinkedAccount.belongsTo(Subscription, {
    as: "subscription",
    foreignKey: "subscriptionId",
  });

  User.hasMany(SubscriptionLinkedAccount, {
    as: "subscriptionLinkedAccounts",
    foreignKey: "subscriptionId",
  });
  SubscriptionLinkedAccount.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });
  // invoices
  User.hasMany(Invoice, {
    as: "invoices",
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Invoice.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });
  // Invoice has one Payment, and we alias it as 'payment'
  Invoice.hasOne(Payment, {
    as: "payment",
    foreignKey: "invoiceId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // Payment belongs to Invoice, and we alias it as 'invoice'
  Payment.belongsTo(Invoice, {
    as: "invoice",
    foreignKey: "invoiceId",
  });

  User.hasMany(Payment, {
    as: "payments",
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Payment.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });

  // Define insurance associations with cascading deletes
  Patient.belongsToMany(Insurance, {
    through: PatientInsurance,
    as: "insurances",
    foreignKey: "patientId",
    onDelete: "CASCADE",
  });

  Insurance.belongsToMany(Patient, {
    through: PatientInsurance,
    as: "patients",
    foreignKey: "insuranceId",
    onDelete: "CASCADE",
  });
  // insurance and services associations
  Insurance.belongsToMany(Service, {
    through: InsuranceServiceCoverage,
    foreignKey: "insuranceId",
    as: "services",
  });
  Service.belongsToMany(Insurance, {
    through: InsuranceServiceCoverage,
    foreignKey: "serviceId",
    as: "insurances",
  });

  LanguageSupport.hasMany(Translation, {
    as: "translations",
    foreignKey: "languageId",
  });
  Translation.belongsTo(LanguageSupport, {
    as: "language",
    foreignKey: "languageId",
  });

  // UserCommunity (many-to-many relationship)
  User.belongsToMany(SupportCommunity, {
    through: UserCommunity,
    as: "communities",
    foreignKey: "userId",
  });

  SupportCommunity.belongsToMany(User, {
    through: UserCommunity,
    as: "members",
    foreignKey: "communityId",
  });
  // user preferences
  User.hasOne(UserPreferences, {
    as: "preferences",
    foreignKey: "userId",
  });
};

// Permission Associations
Role.belongsToMany(Permission, {
  through: RolePermission,
  as: "permissions",
  foreignKey: "roleId",
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  as: "roles",
  foreignKey: "permissionId",
});

// Post and Reports association
CommunityPost.hasMany(PostReport, {
  as: "reports",
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PostReport.belongsTo(CommunityPost, {
  as: "post",
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// user and post Reports association
User.hasMany(PostReport, {
  as: "post_reports",
  foreignKey: "reportedByUserId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PostReport.belongsTo(User, {
  as: "reportedBy",
  foreignKey: "reportedByUserId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
