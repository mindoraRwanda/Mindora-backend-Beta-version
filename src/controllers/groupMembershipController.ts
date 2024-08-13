// src/controllers/groupMembershipController.ts

import { Request, Response } from 'express';
import { createGroupMembership, updateGroupMembership, deleteGroupMembership, getGroupMemberships } from '../models/GroupMembership';

export const createGroupMembershipController = async (req: Request, res: Response) => {
  const { userId, groupId, joinedAt } = req.body;

  if (!userId || !groupId) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const newMembership = await createGroupMembership({
      userId,
      groupId,
      joinedAt
    });
    res.status(201).json(newMembership);
  } catch (err) {
    console.error('Error creating group membership:', err);
    res.status(500).json({ error: "Error occurred while creating group membership!" });
  }
};

export const updateGroupMembershipController = async (req: Request, res: Response) => {
  const { id, ...updateData } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const updatedMembership = await updateGroupMembership(id, updateData);
    if (!updatedMembership) {
      return res.status(404).json({ error: "Group membership not found or not updated." });
    }
    res.status(200).json(updatedMembership);
  } catch (err) {
    console.error('Error updating group membership:', err);
    res.status(500).json({ error: "Error occurred while updating group membership!" });
  }
};

export const deleteGroupMembershipController = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const deletedMembership = await deleteGroupMembership(id);
    if (!deletedMembership) {
      return res.status(404).json({ error: "Group membership not found or not deleted." });
    }
    res.status(200).json(deletedMembership);
  } catch (err) {
    console.error('Error deleting group membership:', err);
    res.status(500).json({ error: "Error occurred while deleting group membership!" });
  }
};

export const getGroupMembershipsController = async (req: Request, res: Response) => {
  const userId = parseInt(req.query.userId as string, 10);
  const groupId = parseInt(req.query.groupId as string, 10);

  try {
    const memberships = await getGroupMemberships(
      isNaN(userId) ? null : userId,
      isNaN(groupId) ? null : groupId
    );
    res.status(200).json(memberships);
  } catch (err) {
    console.error('Error retrieving group memberships:', err);
    res.status(500).json({ error: "Error while retrieving group memberships!" });
  }
};
