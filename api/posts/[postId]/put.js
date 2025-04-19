import Post from "../../../models/post.js"

export default async function updatePost(req, res) {
	const { postId } = req.params
	const { title, content, author } = req.body

	try {
		const post = await Post.findById(postId)
		if (!post) {
			return res.status(404).json({ message: "Post not found" })
		}

		if (post.author._id.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ message: "Forbidden: You are not the author of this post" })
		}

		post.title = title || post.title
		post.content = content || post.content
		post.author = author || post.author

		await post.save()

		res.json({ message: "Post updated successfully", post })
	} catch (error) {
		res.status(500).json({ message: "Error updating post", error })
	}
}
