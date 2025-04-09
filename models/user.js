import bcrypt from "bcrypt"
import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
})

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next()
	}
	try {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (err) {
		next(err)
	}
})

userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)

export default User
