import User from "../../../models/user.js"

export default async function loginUser(req, res) {
	const { username, password } = req.body

	try {
		const user = await User.findOne({ username })
		if (!user) {
			return res.status(401).json({ message: "Invalid username or password" })
		}

		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid username or password" })
		}

		req.session.userId = user._id
		res.json({ message: "Login successful" })
	} catch (error) {
		res.status(500).json({ message: "Error logging in", error })
	}
}
