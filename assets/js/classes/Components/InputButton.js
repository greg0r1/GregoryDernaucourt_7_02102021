export default class InputButton {
    constructor(name) {
        this.name = name
        this.render(this.name)
    }

    toggleDropdownButton(element) {
        element.querySelector('.dropdown-toggle').addEventListener('click', (event) => {

            if (element.querySelector('.dropdown-menu').innerHTML !== '') {
                element.querySelector('.dropdown-menu').classList.toggle('d-block')
                element.querySelector("#inputsForm .inputBtn").classList.toggle('d-block')
                event.currentTarget.classList.toggle('rotate')
                // Size block
                if (event.currentTarget.parentNode.parentNode.classList.contains('d-block')) {
                    const sizeContent = event.currentTarget.parentNode.parentNode.querySelector('div.dropdown-menu').clientWidth
                    event.currentTarget.parentNode.parentNode.style.width = `${sizeContent}px`
                } else {
                    event.currentTarget.parentNode.parentNode.style.width = null
                }

                // Close others dropdown
                const dropdowns = Array.from(document.querySelectorAll(".btn.dropdown-toggle"))
                dropdowns.forEach(el => {
                    if (el.getBoundingClientRect().x != event.currentTarget.getBoundingClientRect().x) {
                        el.classList.remove('rotate')
                        el.parentNode.parentNode.classList.remove('d-block')
                        el.parentNode.parentNode.style.width = null
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

        // Close the dropdown if the user clicks outside of it
        // window.onclick = (event) => {
        //     if (!event.target.matches('.btn.dropdown-toggle')) {
        //         const dropdownContent = Array.from(document.getElementsByClassName("dropdown-menu"))
        //         dropdownContent.forEach(element => {
        //             if (element.classList.contains('d-block')) {
        //                 element.classList.remove('d-block')
        //             }

        //         })
        //         const dropdownwButtons = Array.from(document.getElementsByClassName("dropdown-toggle"))
        //         dropdownwButtons.forEach(element => {
        //             if (element.classList.contains('rotate')) {
        //                 element.classList.remove('rotate')
        //             }
        //         })
        //         const inputsBtn = Array.from(document.getElementsByClassName("inputBtn"))
        //         inputsBtn.forEach(element => {
        //             if (element.classList.contains('d-block')) {
        //                 element.style.width = null
        //                 element.classList.remove('d-block')
        //             }

        //         })
        //     }
        // }
    }

    static sizeBlockContentTags() {
        if (document.querySelector('.dropdown-menu.d-block')) {
            const sizeContent = document.querySelector('.dropdown-menu.d-block').clientWidth
            document.querySelector('.dropdown-menu.d-block').parentNode.style.width = `${sizeContent}px`
        }

    }

    render(name) {
        const div = document.createElement('div')
        document.getElementById('inputsForm').appendChild(div)
        div.innerHTML = `
        <div class= "inputBtn inputBtn-${name} btn btn-group mb-3 mt-3 mr-3 ml-0 row justify-content-start p-3">    
            <div class="input-group-prepend">
                <input type="text" id="${name}" class="btn w-100 p-2" aria-label="${name}" placeholder="${name}">
                <button type="button" class="btn dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            </div>
                <div class="dropdown-menu"></div>
        </div>`

        this.toggleDropdownButton(div)
    }

    static renderInputTags(element, tag, index) {
        document.querySelector(`.inputBtn-${element} .dropdown-items-${index}`).innerHTML += `
                <a class="dropdown-item-${element}"> ${tag.charAt(0).toUpperCase()}${tag.slice(1).toLowerCase()}</a>
                `
    }

    static renderTags(tag, bg) {
        document.querySelector('.tags .row').innerHTML += `
                <div class="tag btn p-2 m-2 bg-${bg}"> ${tag.charAt(0).toUpperCase()}${tag.slice(1).toLowerCase()}
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
                    `
    }

}