import {useNavigate} from "react-router-dom"

import useUser from "../contexts/User"
import usePost from "../contexts/Search"

const Header = () => {
	let navigate = useNavigate()

	const navTo = (path) => {
		navigate(`/${path}`)
	}

	const {loggedUserDetails, setLoggedUserDetails} = useUser()

	const {setSearchQuery} = usePost()

	function logout() {
		setLoggedUserDetails(null)
		localStorage.removeItem("blog-user")
		navTo("login")
	}

	async function searchArticle(e) {
		e.preventDefault()
		let searchText = document.getElementById("articleSearch")
		searchText = searchText.value
		document.getElementById("articleSearch").value = ""
		setSearchQuery(searchText)
	}

	return (
		<header>
			<div className='header-left-side'>
				<div className='header-item logo-text'>
					<a href='/' style={{textDecoration: "none"}}>
						The Chronicles
					</a>
				</div>
				<div className='search-header-item'>
					<form className='search-form'>
						<input type='text' placeholder='Search' id='articleSearch' />
						<button type='submit' onClick={searchArticle}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
								<path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
							</svg>
						</button>
					</form>
				</div>
			</div>
			<div className='header-right-side'>
				{loggedUserDetails !== null ? (
					<>
						<button className='header-item' onClick={() => navTo("create")}>
							Create
						</button>

						<button className=' header-item' onClick={logout}>
							Logout
						</button>
					</>
				) : (
					<button className=' header-item' onClick={() => navTo("login")}>
						Login
					</button>
				)}
				<button className='header-item' onClick={() => navTo("contact")}>
					Connect
				</button>
			</div>
		</header>
	)
}

export default Header
