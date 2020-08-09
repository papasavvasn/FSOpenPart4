import mongoose, { Document, Schema } from 'mongoose';
import uniqueValidator from "mongoose-unique-validator"
mongoose.set('useCreateIndex', true)

export interface IUser extends Document {
    blogs: string[],
    username: string,
    name: string,
    id: string
}

const userSchema: Schema = new mongoose.Schema({
    username: { type: String, minlength: 3, required: true, unique: true },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document: Document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

export const User = mongoose.model('User', userSchema)