import mongoose, {Schema, Document} from 'mongoose'

export interface IUser extends Document {
    name: string
    email: string
    password: string
    confirmed: boolean
}

const userSchema = new Schema({
    email :{
        type: String, 
        required: true,
        lowecase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User
