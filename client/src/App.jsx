import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useState} from "react"

import "./App.css"
import {UserProvider} from "./contexts/User"
import {SearchProvider} from "./contexts/Search"

import Home from "./components/Home"
import Header from "./components/Header"
import Login from "./components/Login"
import Register from "./components/Register"
import Contact from "./components/Contact"
import NotFound from "./components/NotFound"
import CreatePost from "./components/CreatePost"
import EditPost from "./components/EditPost"
import ViewPost from "./components/ViewPost"
import Private from "./components/Private"

function App() {
	const [loggedUserDetails, setLoggedUserDetails] = useState(JSON.parse(localStorage.getItem("blog-user")))

	const [searchQuery, setSearchQuery] = useState("")

	return (
		<UserProvider value={{loggedUserDetails, setLoggedUserDetails}}>
			<SearchProvider value={{searchQuery, setSearchQuery}}>
				<BrowserRouter>
					<Header />

					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/post/:id' element={<ViewPost />} />

						<Route path='/create' element={<Private Component={CreatePost} />} />
						<Route path='/edit/:id' element={<Private Component={EditPost} />} />

						{/* IMPR0VE 404	 */}
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</SearchProvider>
		</UserProvider>
	)
}

export default App
