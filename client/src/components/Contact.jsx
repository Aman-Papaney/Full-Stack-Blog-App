import {useNavigate} from "react-router-dom"
import {useState} from "react"

const Contact = () => {
	let navigate = useNavigate()

	const navTo = (path) => {
		navigate(`/${path}`)
	}

	const [userDetails, setUserDetails] = useState({
		email: "",
		content: "",
		name: "",
	})

	const [message, setMessage] = useState({
		type: "invisible",
		text: "",
	})

	function handleInput(event) {
		setUserDetails((prevState) => {
			return {...prevState, [event.target.name]: event.target.value}
		})
	}

	function sendQuery(e) {
		e.preventDefault()
		setMessage({text: "Your message has been sent. Redirecting...", type: "visible"})
		setTimeout(() => {
			setMessage({text: "", type: "invisible"})
			navTo("")
		}, 1000)
	}

	return (
		<div className='container'>
			<div className='contact-div'>
				<form className='contact-form' onSubmit={(e) => sendQuery(e)}>
					<p className='contact-heading'>Connect With Us</p>

					<label htmlFor='name'>Name</label>
					<input type='name' name='name' id='name' value={userDetails.name} onChange={(e) => handleInput(e)} placeholder='name' required />

					<label htmlFor='email'>Email</label>
					<input type='email' name='email' id='email' value={userDetails.email} onChange={(e) => handleInput(e)} placeholder='email@example.com' required />

					<label htmlFor='content'>Message</label>
					<textarea name='content' cols={45} rows={15} value={userDetails.content} onChange={(e) => handleInput(e)} id='content' placeholder='Enter your message' required />

					<button className='contact-button' type='submit'>
						Submit
					</button>
				</form>

				<p className={`${message.type}`}>{`${message.text}`}</p>
			</div>
		</div>
	)
}

export default Contact
