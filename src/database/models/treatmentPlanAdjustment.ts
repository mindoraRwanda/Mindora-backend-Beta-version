import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface TreatmentPlanAdjustmentAttributes {
  id: string;
  treatmentPlanId: string;
  reason: string;
  changes: object;
  modifiedBy: string;
}

interface TreatmentPlanAdjustmentCreationAttributes
  extends Optional<TreatmentPlanAdjustmentAttributes, "id"> {}

class TreatmentPlanAdjustment
  extends Model<
    TreatmentPlanAdjustmentAttributes,
    TreatmentPlanAdjustmentCreationAttributes
  >
  implements TreatmentPlanAdjustmentAttributes
{
  public id!: string;
  public treatmentPlanId!: string;
  public reason!: string;
  public changes!: object;
  public modifiedBy!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TreatmentPlanAdjustment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    treatmentPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "treatment_plans",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    changes: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    modifiedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "therapists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "treatment_plan_adjustments",
    timestamps: true,
  }
);

export default TreatmentPlanAdjustment;
