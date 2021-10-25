export default class InputButton {
    constructor(name) {
        this.name = name
        this.render(this.name)
    }

    toggleDropdownButton(element) {
        element.querySelector('.dropdown-toggle').addEventListener('click', () => {
            element.querySelector('.dropdown-menu').classList.toggle('d-block')
            element.querySelector('.dropdown-toggle', 'after').classList.toggle('rotate')
        })
    }

    render(name) {
        const div = document.createElement('div')
        document.getElementById('inputsForm').appendChild(div)
        div.innerHTML =
            `
        <div class="inputBtn inputBtn-${name} btn btn-group mb-3 mt-3 mr-3 ml-0 row justify-content-start p-3">    
            <div class="input-group-prepend">
                <input type="text" id="${name}" class="btn w-100 p-2" aria-label="${name}" placeholder="${name}">
                <button type="button" class="btn dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class="dropdown-menu">
                    </div>
                </button>
            </div>
        </div>
        `
        this.toggleDropdownButton(div)
    }

    static renderInputTags(element, tag) {
        document.querySelector(`.inputBtn-${element} .dropdown-menu`).innerHTML += `
        <a class="dropdown-item-${element}">${tag}</a>
        `
    }

    static renderTags(tag, bg) {
        document.querySelector('.tags .row').innerHTML += `
            <div class="tag btn p-2 m-2 bg-${bg}">${tag}
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            `
    }


}