import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db";

interface MessageAttributes {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  messageType: string;
  messageText?: string;
  mediaUrl?: string;
  mediaSize?: number;
  mediaDuration?: number;
}

interface MessageCreationAttributes
  extends Optional<
    MessageAttributes,
    "id" | "messageText" | "mediaUrl" | "mediaSize" | "mediaDuration"
  > {}

class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: string;
  public chatId!: string;
  public senderId!: string;
  public receiverId!: string;
  public messageType!: string;
  public messageText?: string;
  public mediaUrl?: string;
  public mediaSize?: number;
  public mediaDuration?: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "chats",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    messageType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    messageText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mediaSize: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    mediaDuration: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "messages",
    timestamps: true,
  }
);

export default Message;
