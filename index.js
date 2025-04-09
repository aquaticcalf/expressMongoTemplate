import { registerRoutes } from "file-system-api-router"
import mongoose from "mongoose"
import app from "./app.js"
import { API_ROUTES_DIR, MONGODB_URL, PORT } from "./config.js"

mongoose
	.connect(MONGODB_URL)
	.then(async () => {
		console.log("App connected to database")
		await registerRoutes(app, API_ROUTES_DIR)
		app.listen(PORT, () => {
			console.log(`App listening on port: ${PORT}`)
		})
	})
	.catch(error => {
		console.error("Database connection failed:", error)
		process.exit(1)
	})
