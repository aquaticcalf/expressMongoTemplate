import bcrypt from "bcrypt"
import { registerRoutes } from "file-system-api-router"
import app from "./app.js"
import { API_ROUTES_DIR, PORT } from "./config.js"
import { PrismaClient } from "./generated/prisma/index.js"

const prisma = new PrismaClient().$extends({
	query: {
		user: {
			$allOperations({ operation, args, query }) {
				if (["create", "update"].includes(operation) && args.data.password) {
					args.data.password = bcrypt.hash(args.data.password, 10)
				}
				return query(args)
			},
		},
	},
})

async function main() {
	try {
		await prisma.$connect()
		console.log("App connected to database")
		await registerRoutes(app, API_ROUTES_DIR)
		app.use((req, res) => {
			res.status(404).send({ message: "Not Found" })
		})
		app.listen(PORT, () => {
			console.log(`App listening on port: ${PORT}`)
		})
	} catch (error) {
		console.error("Database connection failed:", error)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()

export default app

export { prisma }
