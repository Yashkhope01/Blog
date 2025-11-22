import express from 'express';
import {
    submitContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(submitContact)
    .get(protect, admin, getContacts);

router.route('/:id')
    .get(protect, admin, getContact)
    .put(protect, admin, updateContact)
    .delete(protect, admin, deleteContact);

export default router;

