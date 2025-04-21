import prisma from "../../../index.js"

export default async function getPost(req, res) {
	const { postId } = req.params

	try {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		})

		if (!post) {
			return res.status(404).json({ message: "Post not found" })
		}

		res.json(post)
	} catch (error) {
		res.status(500).json({ message: "Error fetching post", error })
	}
}
