import { Router } from 'express';
import { createMessage, deleteMessage, getChatHistory, updateMessage } from '../controllers/messageController';



const router = Router();

router.post('/create_message', createMessage);
router.post('/update_message', updateMessage);
router.post('/delete_message', deleteMessage);
router.get('/chat_history', getChatHistory);

export default router;