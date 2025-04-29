import { prisma } from "../../../index.js"

export default async function getUser(req, res) {
	const { userId } = req.params
	try {
		const user = await prisma.user.findById(userId)
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: "Error fetching user", error })
	}
}
