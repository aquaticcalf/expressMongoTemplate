import { prisma } from "../../../index.js"

export default async function deletePost(req, res) {
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

		if (post.author._id.toString() !== req.user.id.toString()) {
			return res
				.status(403)
				.json({ message: "Forbidden: You are not the author of this post" })
		}

		await await prisma.post.delete({
			where: {
				id: postId,
			},
		})

		res.json({ message: "Post deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: "Error deleting post", error })
	}
}
