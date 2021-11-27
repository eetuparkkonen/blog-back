import { Schema, model } from 'mongoose';
import { User } from '../types/types';

// Userin schema
const schema = new Schema<User>({
	username: { type: String, required: true },
	email: { type: String, required: true },
});

// User scheman model
export const UserModel = model<User>('User', schema);
