import prisma from "../../index.js"

export default async function getAllUsers(req, res) {
	try {
		const users = await prisma.user.findMany()
		res.json({ users: users })
	} catch (error) {
		res.status(500).json({ message: "Error fetching users", error })
	}
}
