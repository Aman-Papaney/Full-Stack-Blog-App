import {useEffect, useState} from "react"

import Article from "./Article"
import usePost from "../contexts/Search"

const Home = () => {
	const [postDetails, setPostDetails] = useState([])
	const [pageNumber, setPageNumber] = useState(1)
	const {searchQuery} = usePost()
	const [totalPage, setTotalPage] = useState(1)

	useEffect(() => {
		let getPostURL = `http://localhost:4000/getPost/${pageNumber}`

		if (searchQuery.length > 0) getPostURL = `http://localhost:4000/getSearchedPost/${searchQuery}/${pageNumber}`

		fetch(getPostURL, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setPostDetails(data)
			})
	}, [pageNumber, setPostDetails, searchQuery])

	useEffect(() => {
		let totalPageQuery = `http://localhost:4000/total`

		if (searchQuery.length > 0) totalPageQuery = `http://localhost:4000/total/${searchQuery}`

		fetch(totalPageQuery, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.totalPages)

				setTotalPage(data.totalPages)
			})
	}, [searchQuery])

	const getNextPage = () => {
		setPageNumber(pageNumber + 1)
	}

	function getPrevPage() {
		if (pageNumber > 1) {
			setPageNumber(pageNumber - 1)
		}
	}

	return (
		<>{
			totalPage !== 0 ? 
			<div className=' home'>
				<div className='container'>
					{postDetails.map((data) => (
						<Article data={data} key={data._id} />
					))}
				</div>
				<div className='page-buttons'>
					{pageNumber > 1 ? (
						<button className='page-button' onClick={getPrevPage}>
							Prev
						</button>
					) : null}
					{pageNumber !== totalPage ? (
						<button className='page-button' onClick={getNextPage}>
							Next
						</button>
					) : null}
				</div>
			</div>
			:
			<div className="search-res">No Results for the Query</div>
		}
			
		</>
	)
}

export default Home
