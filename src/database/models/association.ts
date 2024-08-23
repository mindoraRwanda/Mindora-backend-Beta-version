import User from "./user";
import Patient from "./patient";
import Therapist from "./therapist";

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
};
