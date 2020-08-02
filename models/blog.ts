import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    author: string;
    url: string;
    likes: number;
}

const blogSchema: Schema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

export const Blog = mongoose.model<IBlog>('Blog', blogSchema)