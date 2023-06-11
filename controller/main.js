const express = require('express')
const Post = require('../config/models/Post')

// adding new blog
const addBlog = async (req, res) => {
    console.log(req.body)
    try{ const post = await Post.create(req.body)
        res.status(200).json({post, message: "Post created successfully"})

    } catch (error) {
        console.log(error.message)

    }
}

// getting all blog posts
const getBlog = async (req, res) => {
    try{ const post = await Post.find()
        res.status(200).json(post)
        

    }catch (error) {
        res.status(500).json({message: error})

    }
}

// getting a post by id 

const getBlogByID = async (req,res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        res.status(200).json({post, message: `post with the ID ${id} found successfully`})

    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}

// to update the blog by id

const updateBlog = async (req,res) => {
    try {
        const {id} = req.params
        const post = await Post.findByIdAndUpdate(id, req.body)
        if(!post) {
            return res.status(404).json({message: `cannot find the product with the ID ${id}`})
        }
        const updatedPost = await Post.findById(id)
        res.status(200).json({updatedPost, message: "updated successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// to detele a blog by id 

const deleteBlog = async (req, res) => {
    try { const {id} = req.params
    const post = await Post.findByIdAndDelete(id)
    if(!post) {
        return res.status(404).json({message: `cannot find the product with the ID ${id}`})
    }
   // const updatedPost = await Post.findById(id)
    res.status(200).json({post, message: "deleted successfully"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    addBlog, getBlog, getBlogByID, updateBlog, deleteBlog
}