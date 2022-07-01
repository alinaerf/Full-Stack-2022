const { max } = require("lodash")
const User=require('../models/user')
const dummy =(blogs)=>{
    return 1
}

const totalLikes = (blogs)=>{
    if (blogs.length===0){
        return 0
    }
    return(
        blogs.reduce((sum, blog)=>{
            return sum+blog.likes},0)
    )
}

const favouriteBlog =(blogs)=>{
    if (blogs.length===0){
        return null
    }
    const likes=blogs.map(blog=>{
        return blog.likes
    })
    const maxLikes=Math.max.apply(null,likes)
    const likedBlogs=blogs.filter(blog=>{
        return(blog.likes===maxLikes)
    })
    return(
        likedBlogs[0]
    )
}

const mostBlogs = (blogs)=>{
    if (blogs.length===0){
        return null
    }
    const authors=blogs.map(blog=>{return blog.author})
    const uniqueAuthors=[...new Set(authors)]
    const authorsBlogs=[]
    const most=[]
    for (var name of uniqueAuthors){
        const found=blogs.filter(blog=>{
            return blog.author===name
        })
        most.push(found.length)
        authorsBlogs.push({author:name, blogs:found.length})
    }
    const maxBlogs=Math.max.apply(null,most)
    return(
        authorsBlogs.filter(author=>{
            return author.blogs===maxBlogs
        })[0]
    )


}
const mostLikes = (blogs)=>{
    if (blogs.length===0){
        return null
    }
    const authors=blogs.map(blog=>{return blog.author})
    const uniqueAuthors=[...new Set(authors)]
    const authorsBlogs=[]
    const most=[]
    for (var name of uniqueAuthors){
        const found=blogs.filter(blog=>{
            return blog.author===name
        }).reduce((sum, blog)=>{
            return sum+blog.likes
        },0)
        most.push(found)
        authorsBlogs.push({author:name, likes:found})
    }
    const maxLikes=Math.max.apply(null,most)
    return(
        authorsBlogs.filter(author=>{
            return author.likes===maxLikes
        })[0]
    )

}

const usersInDb=()=>{
    const users=await User.find({})
    return users.map(u=>u.toJSON())
}

module.exports = {
    dummy, 
    totalLikes,
    favouriteBlog,
    mostBlogs, 
    mostLikes,
    usersInDb
}