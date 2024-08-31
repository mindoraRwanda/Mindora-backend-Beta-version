import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface RewardAttributes {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
}

interface RewardCreationAttributes extends Optional<RewardAttributes, "id"> {}

class Reward
  extends Model<RewardAttributes, RewardCreationAttributes>
  implements RewardAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
  public pointsRequired!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Reward.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pointsRequired: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "rewards",
    timestamps: true,
  }
);

export default Reward;
