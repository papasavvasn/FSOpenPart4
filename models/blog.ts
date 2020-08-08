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
    url: String,
    likes: number;
}

const blogSchema: Schema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Blog = mongoose.model<IBlog>('Blog', blogSchema)