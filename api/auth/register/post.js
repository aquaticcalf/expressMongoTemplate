import prisma from "../../../index.js"

export default async function signupUser(req, res) {
	const { username, password } = req.body
	console.log("Received signup request:", req.body)

	try {
		const existingUser = await prisma.user.findUnique({
			where: { username: username },
		})
		if (existingUser) {
			return res.status(400).json({ message: "Username already taken" })
		}

		const newUser = new prisma.user.create({
			data: {
				username: username,
				password: password,
			},
		})

		req.session.userId = newUser.id
		res.status(201).json({ message: "Signup successful", user: newUser })
	} catch (error) {
		res.status(500).json({ message: "Error signing up", error })
	}
}
