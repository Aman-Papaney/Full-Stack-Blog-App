const Article = (data) => {
	return (
		<div className='article' onClick={() => window.open(`http://localhost:5173/post/${data.data._id}`, "_blank")}>
			<div className='article-img'>
				<img src={`http://localhost:4000/${data.data.coverImage}`} alt='imge' />
			</div>

			<div className='article-text'>
				<div className='article-author'>By {data.data.author} </div>
				<div className='article-title'>{data.data.title} </div>
				<div className='article-desc'>{data.data.summary} </div>
			</div>
		</div>
	)
}

export default Article
