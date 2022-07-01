const { findOneAndRemove } = require("../../osa3/models/person")
const blog = require("../models/blog")

function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length == 0)
        return 0
    else {
        total = 0
        for (let i=0; i < blogs.length; i++) {
            total += blogs[i].likes
        }
    }
    return total
}
 
const favoriteBlog = (blogs) => {
    if (blogs.length == 0)
        return 0
    else {
        favorite = ""
        likes = 0
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].likes > likes) {
                favorite = blogs[i].title
                likes = blogs[i].likes
            }
        }
    }
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length == 0)
        return 0
    else {
        var authors = []
        for (let i=0; i < blogs.length; i++) {
            authors.push(blogs[i].author)
        }
        var most = mode(authors)
        var amount = 0

        for (let i = 0; i < blogs.length; i++) {
            if (most == blogs[i].author)
                amount++
        }
    }
    const tulos = {
        author: most,
        blogs: amount
    }
    return tulos
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}