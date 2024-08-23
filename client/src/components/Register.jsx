import {useState} from "react"
import {useNavigate} from "react-router-dom"

const Register = () => {
	let navigate = useNavigate()

	const navTo = (path) => {
		navigate(`/${path}`)
	}

	function handleInput(event) {
		setUserDetails((prevState) => {
			return {...prevState, [event.target.name]: event.target.value}
		})
	}

	const [userDetails, setUserDetails] = useState({
		username: "",
		email: "",
		password: "",
	})

	const [message, setMessage] = useState({
		type: "invisible",
		text: "",
	})

	function register(e) {
		e.preventDefault()

		if (document.getElementById("confirm-password").value === document.getElementById("password").value) {
			fetch("http://127.0.0.1:4000/register", {
				method: "POST",
				body: JSON.stringify(userDetails),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())

				.then((data) => {
					setMessage({type: "visible", text: "Registration Success. Redirecting..."})

					setTimeout(() => {
						setUserDetails(data.user)
						setMessage({type: "invisible", text: ""})
						navigate("/login")
					}, 1000)
				})

				.catch((err) => {
					console.log(err)
				})
		} else {
			setMessage({type: "visible", text: "Passwords do not match. Enter again"})

			setTimeout(() => {
				setMessage({type: "invisible", text: ""})
			}, 1000)

			setUserDetails({
				username: "",
				email: "",
				password: "",
			})
			document.getElementById("confirm-password").value = ""
		}
	}

	return (
		<div className='container'>
			<div className='login-register-div'>
				<form className='login-register-form' onSubmit={(e) => register(e)}>
					<p className='login-register-heading'>Register</p>

					<label htmlFor='username'>Username</label>
					<input type='name' name='username' id='username' onChange={(e) => handleInput(e)} value={userDetails.username} placeholder='Enter username' required />

					<label htmlFor='email'>Email</label>
					<input type='email' name='email' id='email' onChange={(e) => handleInput(e)} value={userDetails.email} placeholder='email@example.com' required />

					<label htmlFor='password'>Password</label>
					<input type='password' name='password' min={8} onChange={(e) => handleInput(e)} value={userDetails.password} id='password' placeholder='Enter password' required />

					<label htmlFor='confirm-password'>Confirm Password</label>
					<input type='password' name='confirm-password' min={8} id='confirm-password' placeholder='Enter password again' required />

					<button className='login-register-button '>Register</button>
				</form>

				<p className='login-register-text'>
					Aready have an account ?&nbsp;
					<p className='login-register-link' onClick={() => navTo("login")}>
						Login here
					</p>
				</p>
				<p className={` ${message.type}`}>{`${message.text}`}</p>
			</div>
		</div>
	)
}

export default Register
