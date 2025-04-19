import cors from "cors"
import express from "express"
import { ironSession } from "iron-session/express"
import User from "./models/user.js"

import {
	FRONTEND_URL,
	NODE_ENV,
	NO_AUTH_PATHS,
	SESSION_SECRET,
} from "./config.js"

const app = express()

app.use(express.json())

app.use(
	cors({
		origin: FRONTEND_URL || "*",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
)

app.use(
	ironSession({
		cookieName: "session",
		password: SESSION_SECRET,
		cookieOptions: {
			secure: NODE_ENV === "production",
			httpOnly: true,
			sameSite: "lax",
		},
	}),
)

const authenticate = async (req, res, next) => {
	const requiresAuth = !NO_AUTH_PATHS.some(path => {
		return path.endsWith("/") ? req.path.startsWith(path) : req.path === path
	})

	if (!requiresAuth) {
		console.log(`Path ${req.path} does not require authentication.`)
		return next()
	}

	console.log(`Path ${req.path} requires authentication.`)

	if (!req.session || !req.session.userId) {
		console.log("Authentication failed: No session or userId.")
		return res.status(401).send({ message: "Unauthorized: Please log in." })
	}

	try {
		const user = await User.findById(req.session.userId)
		if (!user) {
			console.log(
				`Authentication failed: User not found for ID ${req.session.userId}. Invalidating session.`,
			)
			await req.session.destroy()
			return res.status(401).send({ message: "Unauthorized: Invalid session." })
		}

		req.user = user
		console.log(`User ${user.id} authenticated successfully.`)
		next()
	} catch (error) {
		console.error("Authentication error during user lookup:", error)
		res
			.status(500)
			.send({ message: "Internal Server Error during authentication." })
	}
}

app.use(authenticate)

app.get("/health", (req, res) => {
	res.status(200).send("OK")
})

app.use((req, res) => {
	res.status(404).send({ message: "Not Found" })
})

export default app
