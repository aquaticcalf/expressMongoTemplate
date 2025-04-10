import User from "../../models/user"

export default async function getAllUsers(req, res) {
	try {
		const users = await User.find({})
		res.json(users)
	} catch (error) {
		res.status(500).json({ message: "Error fetching users", error })
	}
}
