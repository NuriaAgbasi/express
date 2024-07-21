let posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' },
]
//creates an array of post objects each having an id and title 


//@desc  Get all posts
//@route GET / api/posts
export const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit)
    //makes a variable 'limit' with the integer value of limit query parameter from the request url
    //NOTE : request is the object provided by express js for handling incoming requests.
    //query is a prperty of the req object that contains the query string eg http://localhost:8000/api/posts?limit=2
    //the query is anything after the ?

    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(posts.slice(0, limit));
    }
    //if limit is a number and is positive it sets the status to 200 which means the request was 
    //successful, and converts the javacript object to a json string using '.json' and then shows the number of post that was
    //inputed in limit for example if the limit is 2 it shows the first two posts
    else {
        res.status(200).json(posts);
    }
    //it returns all the post if the if statement doesnt work
}



//@desc   Get single post 
//@route  GET /api/posts/:id
export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    //creates a constant 'id' and stores the interger value of id paramemter from the request URL

    //another example
    // res.status(200).json(posts.filter((post) => post.id === id))
    //sets the status to 200 which means ok,and filters the posts array by matching the id of inouted to the id in the array

    const post = posts.find((post) => post.id === id);
    //creates a constant post that finds the post with the matching is

    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404;
        //sets the error status to 404
        return next(error);
        //creates a new error object with a descriptive error message 
        //calls the next function with the error. This tells express that an error has occurred 
        //and passes control to the next error-handling middleware


        // res.status(404).json({ msg: `A post with the id of ${id} was not found` })
    }
    //if post is not found returns a 404 status with an error message
    else {
        res.status(200).json(post);
    }
    //if the post was found it returns the post
}



//@desc   Create new Post post 
//@route  POST /api/posts
export const createPost = (req, res, next) => {
    //its sets up a post route on the route url
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    };
    //create a constant 'newPost' with an id that is caculated based on the legth of the posts array plus one
    //and gives it the title from the request body
    if (!newPost.title) {

        const error = new Error(`Please include a title`)
        error.status = 400;

        return next(error);
        // return res.status(400).json({ msg: 'Please include a title' })
    }
    //if the new post doesnt have a title it guve a 40o bas request status and tells the user to incluse a title
    posts.push(newPost)
    //it then pushs the new post to the back of the posts array
    res.status(201).json(posts)
    //it gives a status ogf 201 which means the post have been created and sens the updated post has a json response
}

//@desc   Update Post  
//@route  PUT /api/posts/:id
export const updatePost = (req, res, next) => {
    //it makes a put request to the url parameter of id 
    const id = parseInt(req.params.id);
    //it extracs the id parameter from the request,converts it to an integer and assigns the valuye to the const id
    const post = posts.find((post) => post.id === id);
    //finds the post with the matching id in the post array

    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404;
        return next(error);
        // return res.status(404).json({ msg: `A post with the id of ${id} was not found` })
    }
    //if post was not found, it gives a 404 not found error with a message 
    post.title = req.body.title;
    //this updates the title of the post with the new title provided by the request body 
    res.status(200).json(posts);
    //sends the status code 200 which means ok and sends the updated posts as a json response
}

//@desc   Delete Post post 
//@route  Delete /api/posts/:id
export const deletePost = (req, res, next) => {
    //makes a delete request wirh the url param id
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404;

        return next(error);
        // return res.status(404).json({ msg: `A post with the id of ${id} was not found` })
    }
    posts = posts.filter((post) => post.id !== id);
    //it filters the posts array removing the id that was specified 
    res.status(200).json(posts);
}