import {createContext, useContext} from "react"

export const SearchContext = createContext({
	searchQuery: "",
	setSearchQuery: () => {},
})

export const SearchProvider = SearchContext.Provider

export default function useSearch() {
	return useContext(SearchContext)
}
