import Dataservice from './DataService.js';
import Searchbar from './Components/SearchBar.js';
import InputButton from './Components/InputButton.js';
import Article from './Components/Article.js';
import EventService from './EventService.js';

export default class Controller {
    constructor() {
        this.dataservice = new Dataservice()
        this.inputButtonIngredients
        this.inputButtonAppliance
        this.inputButtonUstensils
        this.init()
    }

    /**
     * Display component article
     *
     * @param {*} recipes
     * @memberof Controller
     */
    displayRecipes(recipes) {
        document.querySelector('.container-lg .row').innerHTML = ''
        Object.keys(recipes).map(key => {
            let article = Article.toString(recipes[key].name, recipes[key].time, recipes[key].description, recipes[key].ingredients)
            document.querySelector('main .row').appendChild(article)
        }).join('')
        Article.ellipsisTextOverflow()
    }

    /**
     * Display filtered recipes from search bar
     * Display tags by result into input fileds
     *
     * @memberof Controller
     */
    displayRecipesFromSearchBarFilter() {
        EventService.handleSearchBarEvent((element) => {
            this.dataservice.getRecipes()
            const array = this.dataservice.recipes

            if (element.value.length > 2) {
                this.dataservice.recipes = []
                this.dataservice.filter(array, element.value)
                this.displayRecipes(this.dataservice.recipes)
                this.displayTagsInputFields()
            } else {
                this.dataservice.getRecipes()
                this.displayRecipes(array)
                document.querySelectorAll('.inputBtn').forEach(e => {
                    e.classList.remove('d-block')
                    e.removeAttribute('style')
                    e.querySelector('.dropdown-menu').classList.remove('d-block')
                    e.querySelector('.dropdown-menu').innerHTML = ''
                    e.querySelector('.dropdown-toggle').classList.add('rotate')
                })
            }
            if (this.dataservice.recipes.length == 0) {
                if (!document.querySelector('.error-message')) {
                    const div = document.createElement('div')
                    div.classList.add('error-message')
                    div.innerText = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.'
                    document.getElementById('searchBar').appendChild(div)
                }
            } if (this.dataservice.recipes.length != 0 && document.querySelector('.error-message')) {
                document.querySelector('.error-message').remove()
            }
        })
    }

    /**
     * Display tag elements from InputButton component
     *
     * @memberof Controller
     */
    displayTagsInputFields() {
        // Ingredients
        let tagsIngredients = this.dataservice.getTagsIngredients()
        document.querySelector(".inputBtn-ingredients .dropdown-menu").innerHTML = ''
        const arrayByNElementsIngredients = this.chunk(tagsIngredients, 10)
        arrayByNElementsIngredients.forEach((array, index) => {
            const indexEl = index
            const div = document.createElement('div')
            div.classList.add('dropdown-items', `dropdown-items-${indexEl}`)
            document.querySelector(`.inputBtn-ingredients .dropdown-menu`).appendChild(div)
            array.forEach(item => {
                InputButton.renderInputTags('ingredients', item, indexEl)
            })
        })

        // Ustensils
        let tagsUstensils = this.dataservice.getTagsUstensils()
        document.querySelector(".inputBtn-ustensils .dropdown-menu").innerHTML = ''
        const arrayByNElementsUstensils = this.chunk(tagsUstensils, 10)
        arrayByNElementsUstensils.forEach((array, index) => {
            const indexEl = index
            const div = document.createElement('div')
            div.classList.add('dropdown-items', `dropdown-items-${indexEl}`)
            document.querySelector(`.inputBtn-ustensils .dropdown-menu`).appendChild(div)
            array.forEach(item => {
                InputButton.renderInputTags('ustensils', item, indexEl)
            })
        })

        // Appliance
        let tagsAppliance = this.dataservice.getTagsAppliance()
        document.querySelector(".inputBtn-appliance .dropdown-menu").innerHTML = ''
        const arrayByNElementsAppliance = this.chunk(tagsAppliance, 10)
        arrayByNElementsAppliance.forEach((array, index) => {
            const indexEl = index
            const div = document.createElement('div')
            div.classList.add('dropdown-items', `dropdown-items-${indexEl}`)
            document.querySelector(`.inputBtn-appliance .dropdown-menu`).appendChild(div)
            array.forEach(item => {
                InputButton.renderInputTags('appliance', item, indexEl)
            })
        })

        // On affiche le tag sous la barre de recherche
        this.displayTag()
    }

    /**
     * Divider for display tags input fields
     *
     * @param {*} arr
     * @param {*} size
     * @returns
     * @memberof Controller
     */
    chunk(arr, size) {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        )
    }

    /**
     * Display tag element from InputButton under search bar
     *
     * @memberof Controller
     */
    displayTag() {
        EventService.handleTagsEvent((el) => {
            if (!document.querySelector('.tags')) {
                const tagsEl = document.createElement('div')
                tagsEl.classList.add('tags')
                tagsEl.innerHTML = '<div class="row ml-n2"></div>'
                document.getElementById('searchBar').after(tagsEl)
            }
            let bg
            // Détermine la couleur du tag
            switch (el.className) {
                case 'dropdown-item-appliance':
                    bg = 'green'
                    break;
                case 'dropdown-item-ustensils':
                    bg = 'red'
                    break;
                case 'dropdown-item-ingredients':
                    bg = 'blue'
                    break;

                default:
                    break;
            }
            // On affiche le tag
            const tag = el.innerText
            InputButton.renderTags(tag, bg)

            // On filtre la vue avec les nouveaux résultats
            if (el.className == 'dropdown-item-appliance') {
                this.dataservice.filterRecipesByTagAppliance(tag)
            }
            if (el.className == 'dropdown-item-ustensils') {
                this.dataservice.filterRecipesByTagUstensils(tag)
            }
            if (el.className == 'dropdown-item-ingredients') {
                this.dataservice.filterRecipesByTagIngredients(tag)
            }

            this.displayRecipes(this.dataservice.recipes)
            this.displayTagsInputFields()
            InputButton.setSizeBlockContentTags()
            this.closeTag()

            // Ferme les champs inputs
            if (document.querySelectorAll('.dropdown-items').length > 0) {
                document.querySelectorAll('.dropdown-items').forEach((e) => {
                    e.parentNode.classList.remove('d-block')
                })
            }
            document.querySelectorAll('.input-group-prepend').forEach(e => {
                e.removeAttribute('style')
                e.parentNode.removeAttribute('style')
                e.parentNode.classList.remove('d-block')
            })
        })
    }

    /**
     *
     *
     * @memberof Controller
     */
    filterTagsInputSearch() {
        EventService.handleInputEvent(element => {
            if (document.querySelector("#searchBar > form > input").value.length > 2) {
                if (element.id === 'ingredients') {
                    let filteredTagsIngredients = this.dataservice.filterTagsInputs(this.dataservice.getTagsIngredients(), element.value)
                    document.querySelector(".inputBtn-ingredients .dropdown-menu").innerHTML = ''
                    const arrayByNElementsIngredients = this.chunk(filteredTagsIngredients, 10)
                    arrayByNElementsIngredients.forEach((array, index) => {
                        const indexEl = index
                        const div = document.createElement('div')
                        div.classList.add('dropdown-items', `dropdown-items-${indexEl}`)
                        document.querySelector(`.inputBtn-ingredients .dropdown-menu`).appendChild(div)
                        array.forEach(item => {
                            InputButton.renderInputTags('ingredients', item, indexEl)
                        })
                    })
                    if (!document.querySelector('.inputBtn-ingredients .dropdown-menu').classList.contains('d-block')) {
                        document.querySelector('.inputBtn-ingredients .dropdown-menu').classList.add('d-block')
                        InputButton.setSizeBlockContentTags()
                    }
                }
                if (element.id === 'appliance') {
                    let filteredTagsAppliance = this.dataservice.filterTagsInputs(this.dataservice.getTagsAppliance(), element.value)
                    document.querySelector(".inputBtn-appliance .dropdown-menu").innerHTML = ''
                    const arrayByNElementsAppliance = this.chunk(filteredTagsAppliance, 10)
                    arrayByNElementsAppliance.forEach((array, index) => {
                        const indexEl = index
                        const div = document.createElement('div')
                        div.classList.add('dropdown-items', `dropdown-items-${indexEl}`)
                        document.querySelector(`.inputBtn-appliance .dropdown-menu`).appendChild(div)
                        array.forEach(item => {
                            InputButton.renderInputTags('appliance', item, indexEl)
                        })
                    })
                    if (!document.querySelector('.inputBtn-appliance .dropdown-menu').classList.contains('d-block')) {
                        document.querySelector('.inputBtn-appliance .dropdown-menu').classList.add('d-block')
                        InputButton.setSizeBlockContentTags()
                    }
                }
                if (element.id === 'ustensils') {
                    let filteredTagsUstensils = this.dataservice.filterTagsInputs(this.dataservice.getTagsUstensils(), element.value)
                    document.querySelector(".inputBtn-ustensils .dropdown-menu").innerHTML = ''
                    const arrayByNElementsUstensils = this.chunk(filteredTagsUstensils, 10)
                    arrayByNElementsUstensils.forEach((array, index) => {
                        const indexEl = index
                        const div = document.createElement('div')
                        div.classList.add('dropdown-items', `dropdown-items-${indexEl}`)
                        document.querySelector(`.inputBtn-ustensils .dropdown-menu`).appendChild(div)
                        array.forEach(item => {
                            InputButton.renderInputTags('ustensils', item, indexEl)
                        })
                    })
                    if (!document.querySelector('.inputBtn-ustensils .dropdown-menu').classList.contains('d-block')) {
                        document.querySelector('.inputBtn-ustensils .dropdown-menu').classList.add('d-block')
                        InputButton.setSizeBlockContentTags()
                    }
                }

                // On affiche le tag sous la barre de recherche
                this.displayTag()
                InputButton.setSizeBlockContentTags()
            }
        })
    }

    /**
     *
     *
     * @memberof Controller
     */
    closeTag() {
        EventService.handleTagsClose((el) => {
            el.parentNode.remove()
            this.dataservice.getDisplayedRequestValues()
            this.dataservice.getRecipes()
            this.dataservice.currentValuesRequests.forEach(el => {
                this.dataservice.filter(this.dataservice.recipes, el)
            })
            this.displayRecipes(this.dataservice.recipes)
            this.displayTagsInputFields()
            if (document.querySelectorAll('.dropdown-items').length > 0) {
                document.querySelectorAll('.dropdown-items').forEach((e) => {
                    e.parentNode.classList.remove('d-block')
                })
            }
            document.querySelectorAll('.input-group-prepend').forEach(e => {
                e.removeAttribute('style')
                e.parentNode.removeAttribute('style')
                e.parentNode.classList.remove('d-block')
            })
            document.querySelectorAll("#inputsForm div.dropdown-menu").forEach(e => e.classList.remove('d-block'))
            document.querySelectorAll("#inputsForm input").forEach(e => e.value = null)
        })
    }

    /**
     *
     *
     * @memberof Controller
     */
    init() {
        //Affiche la barre de recherche
        Searchbar.render()

        //Affiche les boutons de recherche
        this.inputButtonIngredients = new InputButton('ingredients')
        this.inputButtonAppliance = new InputButton('appliance')
        this.inputButtonUstensils = new InputButton('ustensils')
        this.filterTagsInputSearch()
        //Affiche les recettes
        this.displayRecipes(this.dataservice.getRecipes())

        //Affiche les recettes
        this.displayRecipesFromSearchBarFilter()
    }
}