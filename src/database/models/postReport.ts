import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface PostReportAttributes {
  id: string;
  reportedByUserId: string;
  postId: string;
  reason: string;
  status: "Pending" | "Reviewed" | "Resolved";
  actionTaken?: string;
}

interface PostReportCreationAttributes
  extends Optional<PostReportAttributes, "id" | "actionTaken" | "status"> {}

class PostReport
  extends Model<PostReportAttributes, PostReportCreationAttributes>
  implements PostReportAttributes
{
  public id!: string;
  public reportedByUserId!: string;
  public postId!: string;
  public reason!: string;
  public status!: "Pending" | "Reviewed" | "Resolved";
  public actionTaken?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostReport.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    reportedByUserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "community_posts", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Reviewed", "Resolved"),
      defaultValue: "Pending",
      allowNull: false,
    },
    actionTaken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "post_reports",
    timestamps: true,
  }
);

export default PostReport;
