const express = require('express')
const { getBlog, addBlog, getBlogByID, updateBlog, deleteBlog } = require('./main')

const router = express.Router()



router.get('/', getBlog)
router.post('/', addBlog)
router.get('/:id', getBlogByID)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)

module.exports = router