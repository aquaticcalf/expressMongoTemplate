import prisma from "../../../index.js"

export default async function updateUser(req, res) {
	const { userId } = req.params
	const { username, password, email } = req.body

	try {
		// check if user exists
		const user = await prisma.user.findUnique({ where: { id: userId } })
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		// check if user is the user making the request
		if (user.id.toString() !== req.user.id.toString()) {
			return res
				.status(403)
				.json({ message: "Forbidden: You are not the user" })
		}

		// update user
		const updateduser = await prisma.user.update({
			where: {
				username: user.username,
			},
			data: {
				username: username || user.username,
				password: password || user.password,
				email: email || user.email,
			},
		})

		res.json({ message: "User updated successfully", updateduser })
	} catch (error) {
		res.status(500).json({ message: "Error updating user", error })
	}
}
