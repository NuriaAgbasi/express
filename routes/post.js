import express from 'express';
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/postcontrollers.js'
const router = express.Router();


let posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' },
]
//creates an array of post objects each having an id and title 


//See all Posts, app.get takes two argumemts, the path of the get request and an arrow function this 
// arrow function takes two parameter a  request and response
router.get('/', getPosts)

//get a single post based on the id 
router.get('/:id', getPost);

//create Post
router.post('/', createPost)

//Update post
router.put('/:id', updatePost)

//Delete post
router.delete('/:id', deletePost)
// module.exports = router;common js modules

export default router; 