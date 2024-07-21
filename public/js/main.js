const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');
const updateForm = document.querySelector('#update-post-form');

async function showPosts() {
    try {
        const res = await fetch('http://localhost:8000/api/posts');
        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await res.json();
        output.innerHTML = '';

        posts.forEach((post) => {
            const postEl = document.createElement('div');
            postEl.classList.add('border', 'border-gray-200', 'rounded-md', 'p-4', 'mb-4', 'flex', 'justify-between', 'items-center');
            postEl.innerHTML = `
                <span>${post.title}</span>
                <div>
                    <button class="update-btn bg-yellow-500 text-white font-semibold px-2 py-1 rounded-lg mr-2" data-id="${post.id}" data-title="${post.title}">Update</button>
                    <button class="delete-btn bg-red-500 text-white font-semibold px-2 py-1 rounded-lg" data-id="${post.id}">Delete</button>
                </div>
            `;
            output.appendChild(postEl);
        });

        document.querySelectorAll('.update-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const title = e.target.dataset.title;
                document.querySelector('#update-id').value = id;
                document.querySelector('#update-title').value = title;
                updateForm.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                await deletePost(id);
                showPosts();
            });
        });

    } catch (error) {
        console.log('Error fetching posts:', error);
    }
}

async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        if (!res.ok) {
            throw new Error('Failed to add Post');
        }
        await res.json();
        showPosts();
    } catch (error) {
        console.error('Error adding post:', error);
    }
}

async function updatePost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const id = formData.get('id');
    const title = formData.get('title');

    try {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        if (!res.ok) {
            throw new Error('Failed to update Post');
        }
        await res.json();
        updateForm.classList.add('hidden');
        showPosts();
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

async function deletePost(id) {
    try {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            throw new Error('Failed to delete Post');
        }
        await res.json();
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

button.addEventListener('click', showPosts);
form.addEventListener('submit', addPost);
updateForm.addEventListener('submit', updatePost);
