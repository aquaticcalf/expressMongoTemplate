import prisma from "../../../index.js"

export default async function updatePost(req, res) {
	const { postId } = req.params
	const { title, content, author } = req.body

	try {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		})

		if (!post) {
			return res.status(404).json({ message: "Post not found" })
		}

		if (post.authorId.toString() !== req.user.id.toString()) {
			return res
				.status(403)
				.json({ message: "Forbidden: You are not the author of this post" })
		}

		const updatedpost = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				title: title || post.title,
				content: content || post.content,
				author: author || post.author,
			},
		})

		res.json({ message: "Post updated successfully", updatedpost })
	} catch (error) {
		res.status(500).json({ message: "Error updating post", error })
	}
}
