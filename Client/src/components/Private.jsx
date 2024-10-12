import {Navigate} from "react-router-dom"

import useUser from "../contexts/User"

function Private(props) {
	const {loggedUserDetails} = useUser()

	const userLogged = loggedUserDetails !== null ? true : false
	return userLogged === true ? <props.Component /> : <Navigate to='/login' />
}

export default Private
