const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const Blog=require('../models/blog')

const api= supertest(app)
const initialBlogs=[
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5 }
  ]

beforeEach(async()=>{
    await Blog.deleteMany({})
    for (let blog of initialBlogs){
        let blogObject=new Blog(blog)
        await blogObject.save()
    }
})
test('can access a note', async()=>{
    const blogsInitialized=await Blog.find({})
    const blogViewed=blogsInitialized[0]
    const result=await api
        .get(`/api/blogs/${blogViewed.id}`)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
    
    const processedBlog= JSON.parse(JSON.stringify(blogViewed))
    expect(result.body).toEqual(processedBlog) 
})

test('unique id', async()=>{
    const blogs=await Blog.find({})
    for (let blog of blogs){
        expect(blog.id).toBeDefined()
    }
})

test('successfully posts a blog', async()=>{
    const newBlog= {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
      }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const database=await Blog.find({})
    database.map(blog=>blog.toJSON())
    expect(database).toHaveLength(initialBlogs.length+1)
    const titles=database.map(r=>r.title)
    expect(titles).toContain("Type wars")
})
    
test('if likes property is missing, defaults to 0', async()=>{
    const newBlog={
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
      }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const database=await Blog.find({})
    database.map(blog=>blog.toJSON())
    expect(database).toHaveLength(initialBlogs.length+1)
    const addedBlog=database[database.length-1]
    expect(addedBlog.likes).toBe(0)
    
    
})

test('blog without title and url is not added', async()=>{
    const newBlog={
        author:"Robert C. Martin"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
    const database=await Blog.find({})
    database.map(blog=>blog.toJSON())
    expect(database).toHaveLength(initialBlogs.length) 
})

test('deleting a valid blog', async()=>{
    const database=await Blog.find({})
    database.map(blog=>blog.toJSON())
    const deleteBlog=database[0]

    await api
        .delete(`/api/blogs/${deleteBlog.id}`)
        .expect(204)

    const databaseAfter=await Blog.find({})
    databaseAfter.map(blog=>blog.toJSON())
    expect(databaseAfter).toHaveLength(initialBlogs.length-1)
    const titles=databaseAfter.map(b=>b.title)
    expect(titles).not.toContain(deleteBlog.title)
})

test('successfully update a blog', async()=>{
    const database=await Blog.find({})
    database.map(blog=>blog.toJSON())
    const blog=database[0]
    const updatedBlog={
        likes: 100
    }
    await api
        .put(`/api/blogs/${blog.id}`)
        .send(updatedBlog)
        .expect(200)
    const databaseAfter=await Blog.find({})
    databaseAfter.map(blog=>blog.toJSON())
    const blogAfter=databaseAfter[0]
    expect(blogAfter.likes).toBe(updatedBlog.likes)
 

})
    


afterAll (()=>{
    mongoose.connection.close()
})