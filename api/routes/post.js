import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import fs from "fs"

import userModel from "../models/user.js"
import postModel from "../models/post.js"

export async function registerRoute(req, res) {
	let user = req.body

	bcrypt.genSalt(5, (err, salt) => {
		if (!err) {
			bcrypt.hash(user.password, salt, async (err, hash) => {
				if (!err) {
					try {
						user.password = hash

						let data = await userModel.create(user)

						res.status(201).send({
							message: "User Registered Successfully",
							user: data,
						})
					} catch (err) {
						console.log(err)

						res.status(500).send({message: "Error Occurred1"})
					}
				} else {
					res.status(500).send({message: "Error Occurred2"})
				}
			})
		} else {
			res.status(500).send({message: "Error Occured3"})
		}
	})
}

export async function loginRoute(req, res) {
	let userData = req.body

	try {
		let data = await userModel.findOne({email: userData.email})
		if (data !== null) {
			bcrypt.compare(userData.password, data.password, (err, result) => {
				if (result === true) {
					jwt.sign({email: userData.email}, process.env.JWT_KEY, (err, token) => {
						if (!err) {
							res.status(200).send({message: "Login Success", token: token, username: data.username, email: data.email, id: data._id})
						}
					})
				} else {
					console.log(err)

					res.status(401).send({message: "Invalid E-mail or Password"})
				}
			})
		} else {
			res.status(401).send({message: "Invalid E-mail or Password"})
		}
	} catch (err) {
		console.log(err)

		res.status(500).send({message: "Error Occurred"})
	}
}

export async function createRoute(req, res) {
	const {originalname, path} = req.file

	const parts = originalname.split(".")
	const extension = parts[parts.length - 1]
	const newPath = path + "." + extension
	fs.renameSync(path, newPath)

	const {title, summary, content, author} = req.body
	const postData = await postModel.create({title, summary, content, coverImage: newPath, author})

	res.json(postData)
}
