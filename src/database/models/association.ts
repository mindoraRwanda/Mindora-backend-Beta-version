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
};
