import { Router } from "express";
import {
  addHotline,
  getUserEmergencyContacts,
  addEmergencyContact,
} from "../controllers/emergencyContactController";

const router = Router();

router.post("/add_emergency_contacts", addEmergencyContact);
router.post("/add_hotline", addHotline);
router.get("/get_user_emergency_contacts/:userId", getUserEmergencyContacts);

export default router;
