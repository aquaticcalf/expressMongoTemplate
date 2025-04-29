import { prisma } from "../../../index.js"

export default async function createPost(req, res) {
	const { title, content } = req.body

	try {
		const newPost = await prisma.post.create({
			data: {
				title: title,
				content: content,
				authorId: req.user.id,
			},
		})

		res
			.status(201)
			.json({ message: "Post created successfully", post: newPost })
	} catch (error) {
		res.status(500).json({ message: "Error creating post", error })
	}
}
