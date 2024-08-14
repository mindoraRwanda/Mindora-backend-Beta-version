import { Router } from "express";
import {
  addHotline,
  getUserEmergencyContacts,
  addEmergencyContact,
  getHotlines,
  updateHotlineContact,
  updateUserEmergencyContact,
  deleteHotlineContact,
  deleteUserEmergencyContact,
} from "../controllers/emergencyContactController";

const router = Router();

router.post("/add_emergency_contacts", addEmergencyContact);
router.post("/add_hotline", addHotline);
router.get("/get_user_emergency_contacts/:userId", getUserEmergencyContacts);
router.get("/get_hotlines", getHotlines);
router.post("/update_emergency_contact", updateUserEmergencyContact);
router.post("/update_hotline", updateHotlineContact);
router.post("/delete_emergency_contact/:id", deleteUserEmergencyContact);
router.post("/delete_hotline/:id", deleteHotlineContact);

export default router;
