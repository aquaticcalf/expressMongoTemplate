import { prisma } from "../index.js"

async function main() {
	console.log("Start seeding ...")

	// Delete existing data
	console.log("Deleting existing data...")
	await prisma.post.deleteMany({})
	await prisma.user.deleteMany({})

	// Create users
	console.log("Creating users...")
	const users = await prisma.user.createMany({
		data: Array.from({ length: 10 }, (_, i) => ({
			name: `name-${i + 1}`,
			username: `username-${i + 1}`,
			password: `password-${i + 1}`,
		})),
	})
	console.log(`Created ${users.count} users`)

	// Fetch the created user IDs
	const userIds = await prisma.user.findMany({ select: { id: true } })

	// Create posts
	console.log("Creating posts...")
	const posts = await prisma.post.createMany({
		data: Array.from({ length: 50 }, (_, i) => ({
			title: `title-${i + 1}`,
			content: `content-${i + 1}`,
			published: Math.random() < 0.5, // Randomly true or false
			authorId: userIds[Math.floor(Math.random() * userIds.length)].id, // Random authorId
		})),
	})
	console.log(`Created ${posts.count} posts`)

	console.log("Seeding finished.")
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
