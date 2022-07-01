const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
  
    response.json(blogs)
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findById(body.userId)

    const savedBlog = await blog.save()
    user.notes = user.notes.concat(savedBlog._id)
    await user.save()

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id
      })

    response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const userId = decodedToken.id
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === userId.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    }
    response.status(401).json({
        error: 'invalid token'
    })
})
  
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { runValidators: true, context: 'query', new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter