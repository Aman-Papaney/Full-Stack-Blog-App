import {useState} from "react"
import {useNavigate} from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import useUser from "../contexts/User.js"

const CreatePost = () => {
	const {loggedUserDetails} = useUser()
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

	let navigate = useNavigate()

	const navTo = (path) => {
		navigate(`/${path}`)
	}

	const [content, setContent] = useState("")
	const [title, setTitle] = useState("")
	const [summary, setSummary] = useState("")
	const [files, setFiles] = useState("")
	const [author, setAuthor] = useState(loggedUserDetails.username)

	async function createNewPost(e) {
		e.preventDefault()

		const data = new FormData()
		data.set("author", author)
		data.set("title", title)
		data.set("summary", summary)
		data.set("content", content)
		data.set("file", files[0])

		const response = await fetch("http://localhost:4000/create", {
			method: "POST",
			body: data,
		})
		if (response.ok) {
			setMessage({type: "visible", text: "Created Successfully. Redirecting..."})

			setTimeout(() => {
				setMessage({type: "invisible", text: ""})
				navTo("")
			}, 1000)
		} else {
			setMessage({type: "visible", text: "Creation Failed. Try again"})

			setTimeout(() => {
				setMessage({type: "invisible", text: ""})
			}, 1000)
		}
	}

	return (
		<>
			<div className='create-post-div '>
				<form onSubmit={createNewPost} className='create-post-form'>
					<input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
					<input type='text' placeholder='Summary' value={summary} onChange={(e) => setSummary(e.target.value)} required />
					{/* <label className='custom-file-upload'> */}
					<input type='file' onChange={(e) => setFiles(e.target.files)} required />

					{/* </label> */}

					{/* <input type='file' onChange={(e) => setFiles(e.target.files)} required/> */}
					<ReactQuill value={content} theme={"snow"} onChange={(newValue) => setContent(newValue)} modules={modules} required />

					<button type='submit'>Create</button>
					<p className={`${message.type}`}>{`${message.text}`}</p>
				</form>
			</div>
		</>
	)
}

export default CreatePost
