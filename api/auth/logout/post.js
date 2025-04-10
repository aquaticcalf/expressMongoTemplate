export default function logoutUser(req, res) {
	req.session.destroy(err => {
		if (err) {
			return res.status(500).json({ message: "Error logging out", error: err })
		}
		res.json({ message: "Logout successful" })
	})
}
