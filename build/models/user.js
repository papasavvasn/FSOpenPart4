"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
mongoose_1.default.set('useCreateIndex', true);
var userSchema = new mongoose_1.default.Schema({
    username: { type: String, minlength: 3, required: true, unique: true },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
});
userSchema.plugin(mongoose_unique_validator_1.default);
userSchema.set('toJSON', {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    }
});
exports.User = mongoose_1.default.model('User', userSchema);
