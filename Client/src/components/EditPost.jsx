import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"

import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const EditPost = () => {
	let navigate = useNavigate()

	const navTo = (path) => {
		navigate(`/${path}`)
	}

	const postId = useParams().id

	const [content, setContent] = useState("")
	const [title, setTitle] = useState("")
	const [summary, setSummary] = useState("")
	const [files, setFiles] = useState()

	useEffect(() => {
		fetch(`https://full-stack-blog-app-backend.onrender.com/post/${postId}`, {
			method: "GET",
		}).then((response) => {
			response.json().then((postInfo) => {
				setTitle(postInfo.title)
				setContent(postInfo.content)
				setSummary(postInfo.summary)
			})
		})
	}, [postId])

	const [message, setMessage] = useState({
		text: "I'm Invisible",
		type: "invisible",
	})

	const modules = {
		toolbar: [
			[{header: [1, 2, false]}],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{list: "ordered"}, {list: "bullet"}, {indent: "-1"}, {indent: "+1"}],
			["link", "image"],
			["clean"],
		],
	}

	async function editPost(e) {
		e.preventDefault()

		const data = new FormData()
		data.set("title", title)
		data.set("summary", summary)
		data.set("content", content)
		data.set("file", files[0])

		const response = await fetch(`https://full-stack-blog-app-backend.onrender.com/${postId}`, {
			method: "PUT",
			body: data,
		})
		if (response.ok) {
			setMessage({type: "visible", text: "Edit Successfull. Redirecting..."})

			setTimeout(() => {
				setMessage({type: "invisible", text: ""})
				navTo("")
			}, 1000)
		} else {
			setMessage({type: "visible", text: "Edit Failed. Try again"})

			setTimeout(() => {
				setMessage({type: "invisible", text: ""})
			}, 1000)
		}
	}

	return (
		<div className='container'>
			<form className='create-post-form'>
				<input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
				<input type='text' placeholder='Summary' value={summary} onChange={(e) => setSummary(e.target.value)} required />
				<input type='file' onChange={(e) => setFiles(e.target.files)} required />
				<ReactQuill value={content} theme={"snow"} onChange={(newValue) => setContent(newValue)} modules={modules} required />

				<button onClick={editPost}>Save</button>

				<p className={`${message.type}`}>{`${message.text}`}</p>
			</form>
		</div>
	)
}

export default EditPost
