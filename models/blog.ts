import mongoose, { Document, Schema } from 'mongoose';
mongoose.set('useCreateIndex', true)
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
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Blog = mongoose.model<IBlog>('Blog', blogSchema)