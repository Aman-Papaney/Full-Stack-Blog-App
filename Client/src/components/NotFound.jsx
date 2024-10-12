import { Link } from "react-router-dom"

function NotFound() {
	return (
		<div className='container'>
			<h1>404 : NOT FOUND</h1>
			<p>
				Dont Have a Account ? <Link to='/register'>Register Now</Link>
			</p>
		</div>
	)
}

export default NotFound
