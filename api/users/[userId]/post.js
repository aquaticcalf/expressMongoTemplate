import User from "../../../models/user.js"

export default async function updateUser(req, res) {
	const { userId } = req.params
	const { username, password, email } = req.body

	try {
		// check if user exists
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		// check if user is the user making the request
		if (user._id.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ message: "Forbidden: You are not the user" })
		}

		// update user
		user.username = username || user.username
		user.password = password || user.password
		user.email = email || user.email
		await user.save()

		res.json({ message: "User updated successfully", user })
	} catch (error) {
		res.status(500).json({ message: "Error updating user", error })
	}
}
