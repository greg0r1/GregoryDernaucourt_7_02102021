export default class InputButton {
    constructor(name) {
        this.name = name
        this.render(this.name)
    }

    /**
     * Toogle button
     *
     * @param {*} element
     * @memberof InputButton
     */
    toggleDropdownButton(element) {
        element.querySelector('.dropdown-toggle').addEventListener('click', (event) => {

            if (element.querySelector('.dropdown-menu').innerHTML !== '') {
                element.querySelector('.dropdown-menu').classList.toggle('d-block')
                element.querySelector("#inputsForm .inputBtn").classList.toggle('d-block')
                event.currentTarget.classList.toggle('rotate')
                // Size block
                if (event.currentTarget.parentNode.parentNode.classList.contains('d-block') && event.currentTarget.parentNode.parentNode.querySelector('.dropdown-menu').classList.contains('d-block')) {
                    const sizeContent = event.currentTarget.parentNode.parentNode.querySelector('div.dropdown-menu').clientWidth
                    event.currentTarget.parentNode.parentNode.style.width = `${sizeContent}px`
                } else {
                    event.currentTarget.parentNode.parentNode.removeAttribute('style')
                    event.currentTarget.parentNode.parentNode.classList.remove('d-block')
                }

                // Close others dropdown
                const dropdowns = Array.from(document.querySelectorAll(".btn.dropdown-toggle"))
                dropdowns.forEach(el => {
                    if (el.getBoundingClientRect().x != event.currentTarget.getBoundingClientRect().x) {
                        el.classList.remove('rotate')
                        el.parentNode.parentNode.classList.remove('d-block')
                        el.parentNode.parentNode.removeAttribute('style')
                    }
                })

                const dropdowContentElements = Array.from(document.querySelectorAll(".dropdown-menu"))
                const parentNodeEvent = event.currentTarget.parentNode
                dropdowContentElements.forEach(element => {
                    if (element !== parentNodeEvent.nextElementSibling) {
                        element.parentNode.querySelector('.dropdown-menu').classList.remove('d-block')
                        element.parentNode.querySelector('.dropdown-menu').classList.remove('d-flex')
                    }
                })

            }
        })
    }

    /**
     * Resize tags blocks
     *
     * @static
     * @memberof InputButton
     */
    static setSizeBlockContentTags() {
        if (document.querySelectorAll('.dropdown-menu.d-block').length !== 0) {
            document.querySelectorAll('.dropdown-menu.d-block').forEach(e => {
                const sizeContent = e.clientWidth
                e.parentNode.style.width = `${sizeContent}px`
                // e.parentNode.querySelector('.input-group-prepend').style.width = `unset`
            })
        } else {
            document.querySelector('.input-group-prepend').removeAttribute('style')
        }

    }

    /**
     * Render HTML
     *
     * @param {*} name
     * @memberof InputButton
     */
    render(name) {
        const div = document.createElement('div')
        document.getElementById('inputsForm').appendChild(div)

        // Traduction
        let displayName = ''
        if (name === 'appliance') {
            displayName = 'appareils'
        } else if (name === 'ustensils') {
            displayName = 'ustensiles'
        } else {
            displayName = name
        }

        div.innerHTML = `
        <div class= "inputBtn inputBtn-${name} btn btn-group mb-3 mt-3 mr-3 ml-0 row justify-content-start p-3">    
            <div class="input-group-prepend">
                <input type="text" id="${name}" class="btn w-100 p-2" aria-label="${name}" placeholder="${displayName.charAt(0).toUpperCase()}${displayName.slice(1).toLowerCase()}">
                <button type="button" class="btn dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            </div>
                <div class="dropdown-menu"></div>
        </div>`

        this.toggleDropdownButton(div)

    }

    /**
     * Render input tags HTML
     *
     * @static
     * @param {*} element
     * @param {*} tag
     * @param {*} index
     * @memberof InputButton
     */
    static renderInputTags(element, tag, index) {
        document.querySelector(`.inputBtn-${element} .dropdown-items-${index}`).innerHTML += `
                <a class="dropdown-item-${element}">${tag.charAt(0).toUpperCase()}${tag.slice(1).toLowerCase()}</a>
                `
    }

    /**
     * Render tags HTML
     *
     * @static
     * @param {*} tag
     * @param {*} bg
     * @memberof InputButton
     */
    static renderTags(tag, bg) {
        console.log(document.querySelector(`${tag}`))
        if (!document.querySelector(`.${tag}`)) {
            document.querySelector('.tags .row').innerHTML += `
                    <div class="tag btn p-2 m-2 bg-${bg} ${tag}"> ${tag.charAt(0).toUpperCase()}${tag.slice(1).toLowerCase()}
                    <button type="button" class="btn-close" aria-label="Close"></button>
                </div>
                        `
        }
    }

}