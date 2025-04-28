import prisma from "../../../index.js"

export default async function loginUser(req, res) {
	const { username, password } = req.body

	try {
		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
		})
		if (!user) {
			return res.status(401).json({ message: "Invalid username" })
		}

		const isMatch = await Bun.password.verify(password, user.password)
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid password" })
		}

		req.session.userId = user.id
		res.json({ message: "Login successful" })
	} catch (error) {
		res.status(500).json({ message: "Error logging in", error })
	}
}
