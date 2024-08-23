import User from "./user";
import Patient from "./patient";

export const modelAssociation = async () => {
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
};
