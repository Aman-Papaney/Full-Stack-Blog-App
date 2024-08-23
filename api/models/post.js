import mongoose from "mongoose"

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		summary: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		coverImage: {
			type: String,
			required: true,
		},
	},
	{timestamps: true}
)

const postModel = mongoose.model("posts", postSchema)

export default postModel
