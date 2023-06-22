class Catalog {
    #el = null
    #paginationEl = null
    #itemsEl = null
    #page = null
    #total = null
    #renderItem = null
    #getItems = null

    constructor(el, options) {
        const { renderItem, getItems } = options
        this.#el = el
        this.#page = this.getPage()
        this.#paginationEl = el.querySelector('[data-catalog-pagination]')
        this.#itemsEl = el.querySelector('[data-catalog-items]')
        this.#renderItem = renderItem
        this.#getItems = getItems
    }

    get limit () {
        return 12;
    }

    get pageCount () {
        return Math.ceil(this.#total / this.limit)
    }

    async init () {
        window.onpopstate = async () => {
            const url = new URL(window.location.href);
            const page = +url.searchParams.get('page');

            if (page !== this.#page) {
                this.setPage(page);
                await this.loadItems()
            }
        }

        this.#paginationEl.addEventListener('click', async (event) => {
            const item = event.target.dataset.catalogPaginationPage ? event.target : event.target.closest('[data-catalog-pagination-page]')

            if (!item) {
                return;
            }

            const page = +item.dataset.catalogPaginationPage

            this.setPage(page);
            this.pushState();
            await this.loadItems()
        })

        await this.loadItems()
    }

    getPage () {
        const url = new URL(window.location.href);
        const page = +url.searchParams.get('page');

        return page || 1;
    }

    setPage (page) {
        this.#page = page
    }

    pushState () {
        const url = new URL(window.location.href);
        url.searchParams.set('page', this.#page);

        window.history.pushState({}, '', url)
    }

    async loadItems () {
        try {
            let {items, total} = await this.#getItems({limit: this.limit, page: this.#page});
            this.#total = total;
            this.renderItems(items);
            this.renderPagination();
        } catch (error) {
            console.log(error);
        }
    }

    renderItems (items) {
        this.#itemsEl.innerHTML = items.map(this.#renderItem).join('')
    }

    renderPagination () {
        let html = ''

        for (let index = 0; index < this.pageCount; index++) {
            const page = index + 1;

            const classes = ['catalog__pagination-item']

            if (page === this.#page) {
                classes.push('catalog__pagination-item_active')
            }

            html += `
                <button
                    class="${classes.join(' ')}"
                    data-catalog-pagination-page="${page}"
                >
                    ${page}
                </button>
            `
        }

        this.#paginationEl.innerHTML = html
    }
}

const renderPostItem = item => `
    <a  href="posts.html?post=${item.id}" class="post-item">
        <span class="post-item__title">
            ${item.title}
        </span>

        <span class="post-item__body">
            ${item.body}
        </span>
    </a>
`

const getPostItems = async ({ limit, page }) => {
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const total = +res.headers.get('x-total-count');
    const items = await res.json();
    return { items, total };
}

const renderPhotoItem = item => `
    <a  
        href="photos/${item.id}"
        class="photo-item"
    >
        <span class="photo-item__title">
            ${item.title}
        </span>

        <img 
            src=${item.url}
            class="photo-item__image"
        >
    </a>
`

const getPhotoItems = async ({ limit, page }) => {
    let res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`);
    const total = +res.headers.get('x-total-count');
    const items = await res.json();
    return { items, total };
}

const init = async () => {
    const catalog = document.getElementById('catalog')
    await new Catalog(catalog, {
        renderItem: renderPostItem,
        getItems: getPostItems
    }).init()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    await init()
}