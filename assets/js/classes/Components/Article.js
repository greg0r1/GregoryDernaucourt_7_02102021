export default class Article {

    /**
     * Render html
     *
     * @static
     * @param {*} name
     * @param {*} time
     * @param {*} description
     * @param {*} ingredients
     * @returns
     * @memberof Article
     */

    static toString(name, time, description, ingredients) {
        const div = document.createElement('div')
        div.classList.add("col-md-4")

        div.innerHTML = `
        <article class="recipe card mb-4 box-shadow">
            <div class="card-img-top">
                <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17c4bd7aa26%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17c4bd7aa26%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.8203125%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                    alt="">
            </div>
            <section class="card-body py-2 px-3">
                <div class="recipe-header d-flex justify-content-between align-items-center mb-1">
                    <h2 class="name my-auto">${name}</h2>
                    <div class="time d-flex justify-content-end align-items-center w-25">
                        <img class="mr-2" src="assets/images/icons/clock.svg"
                            alt="" width="14px" height="14px"><span>${time}</span>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="recipe-ingredients w-50">
                        <ul class="p-0">
                            ${Object.keys(ingredients).map(key => `
                            <li><span>${ingredients[key].ingredient}: </span><span>${ingredients[key].quantity || ''}</span><span>${ingredients[key].unit || ''}</span></li>`).join('')}
                        </ul>
                    </div>
                    <div class="recipe-description card-text w-50">
                        <p>${description}</p>
                    </div>
                </div>
            </section>
        </article>`

        return div
    }

    /**
     * Ellipsis text overflow
     *
     * @memberof Article
     */
    static ellipsisTextOverflow() {
        const textContainers = document.querySelectorAll('.recipe-description')
        textContainers.forEach((element) => {
            const p = element.querySelector('p')
            if (p.clientHeight > element.clientHeight) {
                p.style.height = `${element.clientHeight}px`
                const arrayFromP = Array.from(p.innerText.split(' '))
                const arrayFromPToString = arrayFromP.slice(0, 30).join(' ')
                p.innerHTML = arrayFromPToString + '&hellip;';
            }
        })
    }

    static overflowUlList() {
        const ulContainer = document.querySelectorAll('.recipe-ingredients')
        ulContainer.forEach((element) => {
            const ul = element.querySelector('ul')
            if (ul.clientHeight > element.clientHeight) {
                element.querySelector('li:nth-child(4n)').remove()
            }
        })
    }
}