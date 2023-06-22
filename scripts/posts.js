class Post {
    #el = null
    #post = null
    #getInfo = null
    #btn = null
    #getComments = null
    #commentsEl = null

    constructor(el, getInfo, commentsButton, getComments, commentsEl) {
        this.#el = el;
        this.#getInfo = getInfo;
        this.#btn = commentsButton;
        this.#getComments = getComments;
        this.#commentsEl = commentsEl;
    }

    async init () {
        const url = new URL(window.location.href);
        this.#post = +url.searchParams.get('post');
        await this.loadItems()
        this.#btn.onclick = async () => {await this.loadComments()};
    }

    async loadItems () {
        try {
            let items = await this.#getInfo(this.#post);
            this.renderPost(items);
        } catch (error) {
            console.log(error);
        }
    }

    async loadComments () {
        try {
            let comments = await this.#getComments(this.#post);
            this.renderComments(comments);
        } catch (error) {
            console.log(error);
        }
    }

    renderPost (items) {
        this.#el.innerHTML = `
            <p>Пользователь: ${items.userId}</p>
            <p>Пост: ${items.id}</p>
            <p>Заголовок поста: ${items.title}</p>
            <p>Содержание поста: ${items.body}</p>
        `;
    }

    renderComments (items) {
        for (let i in items) {
            this.#commentsEl.innerHTML += `
            <p>${items[i].name}</p>
            <p>${items[i].email}</p>
            <p>${items[i].body}</p>
            <br/>
        `;
        }
        this.#btn.style.display = "none";
    }
}

const getPostInfo = async (postId) => {
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return await res.json();
}

const getPostComments = async (postId) => {
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return await res.json();
}

const init = async () => {
    const postEl = document.getElementById('post');
    const commentsButton = document.getElementById('commentsButton');
    const commentsEl = document.getElementById('comments');
    let post = new Post(postEl, getPostInfo, commentsButton, getPostComments, commentsEl);
    await post.init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    await init();
}