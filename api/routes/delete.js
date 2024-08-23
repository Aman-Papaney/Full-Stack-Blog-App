import postModel from "../models/post.js"

export async function deletePostRoute(req, res) {
	const id = req.params.id
	const data = await postModel.deleteOne({_id: id})

	res.json("ok")
}
