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
    }

    displayRecipes(recipes) {
        document.querySelector('.container-lg .row').innerHTML = ''
        Object.keys(recipes).map(key => {
            let article = Article.toString(recipes[key].name, recipes[key].time, recipes[key].description, recipes[key].ingredients)
            document.querySelector('main .row').appendChild(article)
        }).join('')
    }

    displayRecipesFromFilter() {
        EventService.handleSearchBarEvent((element) => {
            const array = this.dataservice.recipes
            if (element.value.length > 2) {
                this.dataservice.filter(array, element.value)
                this.displayRecipes(array)
                this.displayTagsInputFields()
            } else {
                this.dataservice.getRecipes()
                this.displayRecipes(array)
            }
        })
    }

    displayRecipesFromApplianceInput() {
        EventService.handleApplianceInputEvent((element) => {
            if (element.currentTarget.value.length > 3) {
                this.dataservice.filterAppliance(this.dataservice.filteredRecipes, element.currentTarget.value)
                this.displayRecipes(this.dataservice.filteredRecipesByAppliance)
            } else if (element.currentTarget.value.length < 3) {
                this.displayRecipes(this.dataservice.recipes)
            }
        })
    }

    displayRecipesFromAIngredientsInput() {
        EventService.handleIngredientsInputEvent((element) => {
            if (element.currentTarget.value.length > 3) {
                this.dataservice.filterIngredients(this.dataservice.filteredRecipes, element.currentTarget.value)
                this.displayRecipes(this.dataservice.filteredRecipesByIngredients)
            } else if (element.currentTarget.value.length < 3) {
                this.displayRecipes(this.dataservice.recipes)
            }
        })
    }

    displayTagsInputFields() {
        const inputsElements = Array.from(document.querySelectorAll("#inputsForm input"))
        inputsElements.forEach((element) => {
            if (element.id === 'appliance') {
                let tagsAppliance = this.dataservice.getTagsAppliance()
                tagsAppliance.forEach((el) => InputButton.renderInputTags('appliance', el))
            } else if (element.id === 'ustensils') {
                let tagsUstensils = this.dataservice.getTagsUstensils()
                tagsUstensils.forEach((el) => InputButton.renderInputTags('ustensils', el))
            }
        })
        this.displayTag()
    }

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
            const array = this.dataservice.recipes
            this.dataservice.filter(array, tag)
            this.displayRecipes(this.dataservice.recipes)
            this.closeTag()
        })
    }

    closeTag() {
        EventService.handleTagsClose((el) => {
            this.dataservice.getRecipes()
            const array = this.dataservice.recipes
            this.displayRecipes(array)
            el.parentNode.remove()
        })
    }

    init() {
        //Affiche la barre de recherche
        Searchbar.render()

        //Affiche les boutons de recherche
        this.inputButtonIngredients = new InputButton('ingredients')
        this.inputButtonAppliance = new InputButton('appliance')
        this.inputButtonUstensils = new InputButton('ustensils')

        //Affiche les recettes
        this.displayRecipes(this.dataservice.getRecipes())

        //Affiche les recettes
        this.displayRecipesFromFilter()
    }
}