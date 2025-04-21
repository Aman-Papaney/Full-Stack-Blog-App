import {useEffect, useState} from "react"

import Article from "./Article"
import usePost from "../contexts/Search"

const Home = () => {
	const [postDetails, setPostDetails] = useState([])
	const [pageNumber, setPageNumber] = useState(1)
	const {searchQuery} = usePost()
	const [totalPage, setTotalPage] = useState(1)

	useEffect(() => {
		let getPostURL = `https://full-stack-blog-app-backend.onrender.com/getPost/${pageNumber}`

		if (searchQuery.length > 0) getPostURL = `https://full-stack-blog-app-backend.onrender.com/getSearchedPost/${searchQuery}/${pageNumber}`

		fetch(getPostURL, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setPostDetails(data)
			})
	}, [pageNumber, setPostDetails, searchQuery])

	useEffect(() => {
		let totalPageQuery = `https://full-stack-blog-app-backend.onrender.com/total`

		if (searchQuery.length > 0) totalPageQuery = `https://full-stack-blog-app-backend.onrender.com/total/${searchQuery}`

		fetch(totalPageQuery, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
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
			<div className="search-res">No Articles Found</div>
		}
			
		</>
	)
}

export default Home
