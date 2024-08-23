import postModel from "../models/post.js"
import fs from "fs"

export async function editPostRoute(req, res) {
	const id = req.params.id

	const {originalname, path} = req.file

	const parts = originalname.split(".")
	const extension = parts[parts.length - 1]
	const newPath = path + "." + extension
	fs.renameSync(path, newPath)

	const {title, summary, content} = req.body

	let data = await postModel.findOneAndUpdate({_id: id}, {title, summary, content, coverImage: newPath})
	res.json(data)
}
