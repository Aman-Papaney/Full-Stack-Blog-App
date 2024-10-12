import {createContext, useContext} from "react"

export const UserContext = createContext({
	loggedUserDetails: {
		username: "",
		email: "",
		token: "",
		id: "",
	},
	setLoggedUserDetails: () => {},
})

export const UserProvider = UserContext.Provider

export default function useUser() {
	return useContext(UserContext)
}
