// src/controllers/notificationController.ts

import { Request, Response } from 'express';
import { createNotification, updateNotification, deleteNotification, getNotifications } from '../models/Notification';

export const createNotificationController = async (req: Request, res: Response) => {
  const { userId, notificationText, type, sentAt } = req.body;

  if (userId === undefined || notificationText === undefined || type === undefined) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const newNotification = await createNotification({
      userId,
      notificationText,
      sentAt,
      type
    });
    res.status(201).json(newNotification);
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ error: "Error occurred while creating notification!" });
  }
};

export const updateNotificationController = async (req: Request, res: Response) => {
  const { id, ...updateData } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const updatedNotification = await updateNotification(id, updateData);
    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found or not updated." });
    }
    res.status(200).json(updatedNotification);
  } catch (err) {
    console.error('Error updating notification:', err);
    res.status(500).json({ error: "Error occurred while updating notification!" });
  }
};

export const deleteNotificationController = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const deletedNotification = await deleteNotification(id);
    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found or not deleted." });
    }
    res.status(200).json(deletedNotification);
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ error: "Error occurred while deleting notification!" });
  }
};

export const getNotificationsController = async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const notifications = await getNotifications(parseInt(userId as string, 10));
    res.status(200).json(notifications);
  } catch (err) {
    console.error('Error retrieving notifications:', err);
    res.status(500).json({ error: "Error while retrieving notifications!" });
  }
};
