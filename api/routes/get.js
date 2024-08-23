import postModel from "../models/post.js"
import jwt from "jsonwebtoken"
import userModel from "../models/user.js"

export async function getPostRoute(req, res) {
	const {pageNum, searchQuery} = req.params

	let data = await postModel
		.find()
		.skip(5 * (pageNum - 1))
		.limit(5)

	res.json(data)
}

export async function getPostSearchRoute(req, res) {
	const {pageNum, searchQuery} = req.params

	let data = await postModel
		.find({title: {$regex: searchQuery, $options: "i"}})
		.skip(5 * (pageNum - 1))
		.limit(5)

	res.json(data)
}

export async function viewPostRoute(req, res) {
	const {id} = req.params
	let data = await postModel.findOne({_id: id})
	res.json(data)
}

export async function getTotalPages(req, res) {
	let totalDoc = await postModel.countDocuments({})
	const totalPages = totalDoc % 5 === 0 ? totalDoc / 5 : Math.floor(totalDoc / 5) + 1

	res.json({totalPages})
}

export async function getTotalSearchPages(req, res) {
	const {searchQuery} = req.params
	let totalPages = 0

	let totalDoc = await postModel.find({title: {$regex: searchQuery, $options: "i"}}).countDocuments({})
	totalPages = totalDoc % 5 === 0 ? totalDoc / 5 : Math.floor(totalDoc / 5) + 1

	res.json({totalPages})
}
