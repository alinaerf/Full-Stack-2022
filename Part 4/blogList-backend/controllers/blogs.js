const blogsRouter=require('express').Router()
const { request } = require('express')
const jwt=require('jsonwebtoken')
const Blog=require("../models/blog")
const User=require('../models/user')

const tokenExtractor =request=>{
  const authorization= request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
      return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async(request, response) => {
  const blogs= await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs)
  })

blogsRouter.get('/:id', async(request, response, next)=>{
  const blog= await Blog.findById(request.params.id)
  if (blog){
    response.json(blog)
  }else{
    response.status(404).end()
  }

} )
blogsRouter.post('/', async(request, response, next) => {
    const body=request.body
    const token=tokenExtractor(request)
    const decodedToken=jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id){
      return response.status(401).json({error:'token missing or invalid'})
    }
    const user= await User.findById(decodedToken.id)
    if (!body.title || !body.url){
      return response.status(400).end()
    }
    const blog = new Blog({
      title:body.title,
      url:body.url, 
      likes:body.likes || 0,
      author:body.author || null,
      user: user._id
    })
    const addedBlog=await blog.save()
    user.blogs=user.blogs.concat(addedBlog._id)
    await user.save()
    response.status(201).json(addedBlog)
  })

blogsRouter.delete('/:id', async(request, response, next)=>{
  const token=tokenExtractor(request)
  const decodedToken=jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id){
      return response.status(401).json({error:'token missing or invalid'})
    }
  const blog=await Blog.findById(request.params.id)
  if (blog.user.toString()===decodedToken.id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  return response.status(401).send({error:'no deletion rights'})
  
})

blogsRouter.put('/:id', async(request,response, next)=>{
  const body=request.body
  const blog={
    likes:body.likes,
    author:body.author,
    title:body.title,
    url:body.url
  }
  const updatedBlog=await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.json(updatedBlog)
})

module.exports=blogsRouter