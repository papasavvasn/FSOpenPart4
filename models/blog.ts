import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    author: string;
    url: string;
    likes: number;
}

export interface ClientBlog {
    title: string;
    author: string;
    likes: number;
}

const blogSchema: Schema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

export const Blog = mongoose.model<IBlog>('Blog', blogSchema)