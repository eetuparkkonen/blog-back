import { Schema, model } from 'mongoose';
import { Blog } from './types';

// Blogin schema
const schema = new Schema<Blog>({
  name: { type: String, required: true },
  email: { type: String },
  text: { type: String, required: true },
});

// Blog scheman model
export const BlogModel = model<Blog>('Blog', schema);
