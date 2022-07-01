const BlogForm =({author,authorChange,title,titleChange,url,urlChange, addBlog})=>{
    return(
        <div>
            <h2>Add a new blog:</h2>
                <form onSubmit={addBlog}>
                <div>
                    Author: <input value={author} onChange={authorChange} />
                </div>
                <div>
                    Title: <input value={title} onChange={titleChange} />
                </div>
                <div>
                    URL: <input value={url} onChange={urlChange} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
                </form>
        </div>
    )
}
export default BlogForm