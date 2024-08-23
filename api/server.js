import express from "express"
import cors from "cors"
import "dotenv/config"
import multer from "multer"

import connectDB from "./misc/db.js"
import {dirname} from "node:path"
import {fileURLToPath} from "node:url"
const __dirname = dirname(fileURLToPath(import.meta.url))

import {registerRoute, loginRoute, createRoute} from "./routes/post.js"
import {getPostRoute, getPostSearchRoute, viewPostRoute, getTotalPages, getTotalSearchPages} from "./routes/get.js"
import {deletePostRoute} from "./routes/delete.js"
import {editPostRoute} from "./routes/put.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static(__dirname + "/uploads"))

const uploadMiddleware = multer({dest: "uploads/"})

connectDB()

app.post("/register", registerRoute)
app.post("/login", loginRoute)
app.post("/create", uploadMiddleware.single("file"), createRoute)

app.put("/:id", uploadMiddleware.single("file"), editPostRoute)

app.get("/getPost/:pageNum", getPostRoute)
app.get("/getSearchedPost/:searchQuery/:pageNum", getPostSearchRoute)
app.get("/post/:id", viewPostRoute)
app.get("/total/:searchQuery", getTotalSearchPages)
app.get("/total/", getTotalPages)

app.delete("/:id", deletePostRoute)

app.listen(4000, () => {
	console.log("Server running at http://127.0.0.1:4000")
})
