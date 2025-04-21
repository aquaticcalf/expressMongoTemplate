import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL
const SESSION_SECRET = process.env.SESSION_SECRET
const FRONTEND_URL = process.env.FRONTEND_URL
const NODE_ENV = process.env.NODE_ENV || "development"
const API_ROUTES_DIR = process.env.API_ROUTES_DIR || "api"

const NO_AUTH_PATHS = ["/auth/login", "/auth/register", "/public", "/health"]

if (!SESSION_SECRET) {
	console.error(
		"FATAL ERROR: SESSION_SECRET is not defined in environment variables.",
	)
	process.exit(1)
}
if (!MONGODB_URL) {
	console.error(
		"FATAL ERROR: MONGODB_URL is not defined in environment variables.",
	)
	process.exit(1)
}

export {
	PORT,
	MONGODB_URL,
	SESSION_SECRET,
	FRONTEND_URL,
	NODE_ENV,
	NO_AUTH_PATHS,
	API_ROUTES_DIR,
}
