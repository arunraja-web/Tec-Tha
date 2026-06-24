import express from "express";

import {
  createConversation, getAllConversations,replyToConversation,deleteMessage,getMyConversations,
} from "../controllers/contactController.js";

import {
  authenticate,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/my-conversations",
  authenticate,
  getMyConversations
);



router.delete(
  "/message/:id",
  authenticate,
  deleteMessage
);
router.patch(
  "/message/delete/:id",
  authenticate,
  deleteMessage
);

router.post(
  "/create",
  authenticate,
  createConversation
);

router.get(
  "/all",
  authenticate,
  getAllConversations
);

router.post(
  "/reply/:id",
  authenticate,
  replyToConversation
);
export default router;