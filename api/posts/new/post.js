import Post from "../../../models/post.js"

export default async function createPost(req, res) {
	const { title, content } = req.body

	try {
		const newPost = new Post({ title, content, author: req.user._id })
		await newPost.save()

		res
			.status(201)
			.json({ message: "Post created successfully", post: newPost })
	} catch (error) {
		res.status(500).json({ message: "Error creating post", error })
	}
}
