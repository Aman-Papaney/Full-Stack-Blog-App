import {useNavigate} from "react-router-dom"
import {useState} from "react"
import useUser from "../contexts/User"

const Login = () => {
	let navigate = useNavigate()

	const navTo = (path) => {
		navigate(`/${path}`)
	}

	const [message, setMessage] = useState({
		text: "",
		type: "invisible",
	})

	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	})

	const {setLoggedUserDetails} = useUser()

	function handleInput(event) {
		setUserDetails((prevState) => {
			return {...prevState, [event.target.name]: event.target.value}
		})
	}

	function login(event) {
		event.preventDefault()

		fetch("http://localhost:4000/login", {
			method: "POST",
			body: JSON.stringify(userDetails),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				if (data.token !== undefined) {
					setMessage({type: "visible", text: "Login Success. Redirecting..."})

					setTimeout(() => {
						localStorage.setItem("blog-user", JSON.stringify(data))
						setLoggedUserDetails(data)
						setMessage({type: "invisible", text: ""})
						navigate("/")
					}, 1000)
				} else {
					const t = {email: "", password: ""}
					setUserDetails(t)

					setMessage({type: "visible", text: "Login Failed. Try again"})

					setTimeout(() => {
						setMessage({type: "invisible", text: ""})
					}, 1000)
				}
			})
	}

	return (
		<div className='container'>
			<div className='login-register-div'>
				<form className='login-register-form' onSubmit={(e) => login(e)}>
					<p className='login-register-heading'>Log In</p>

					<label htmlFor='email'>Email</label>
					<input type='email' name='email' id='email' value={userDetails.email} onChange={(e) => handleInput(e)} placeholder='email@example.com' required />

					<label htmlFor='password'>Password</label>
					<input type='password' name='password' value={userDetails.password} onChange={(e) => handleInput(e)} min={8} id='password' placeholder='Enter password' required />

					<button className='login-register-button'>Login</button>
				</form>

				<p className='forget-password'>Forget Password ?</p>
				<div className='login-register-text'>
					Don&apos;t have an account ?&nbsp;
					<p className='login-register-link' onClick={() => navTo("register")}>
						Register here
					</p>
				</div>
				<p className={`${message.type}`}>{`${message.text}`}</p>
			</div>
		</div>
	)
}

export default Login
