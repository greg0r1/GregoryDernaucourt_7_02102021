import { recipes } from '../../JSON/Recipes.js';


export default class DataService {

    constructor() {
        this.recipes = []
        this.filteredRecipes = []
        this.filteredRecipesByIngredients = []
        this.filteredRecipesByUstensils = []
        this.filteredRecipesByAppliance = []
        this.filteredTags = []
        this.currentValuesRequests = []
    }

    getRecipes() {
        const recipesFromJson = recipes
        return this.recipes = recipesFromJson
    }

    filter(arr = [], request = '') {
        request = request.toLowerCase()
        if (!request) {
            this.getRecipes()
        } else {
            this.recipes = arr.filter(({ name, description, ingredients }) => {
                return ((name.toLowerCase().indexOf(request.toLowerCase())) && (description.toLowerCase().indexOf(request))) !== -1
            })
        }
    }

    getRecipesByAdvancedSearch(array, filter) {
        array.filter(({ name, description, ingredients }) => {
            return name.toLowerCase().includes(filter.toLowerCase()) + description.toLowerCase().includes(filter.toLowerCase()) + ingredients[0].ingredient.toLowerCase().includes(filter.toLowerCase())
        })
    }

    getFilteredIngredients() {

    }

    getTagsAppliance() {
        let array = []
        this.recipes.forEach(element => {
            if (array.findIndex(e => e === element.appliance) === -1) {
                array.push(element.appliance)
            }
        })
        return array
    }

    getTagsUstensils() {
        const allTags = this.recipes.reduce(
            (allTags, { ustensils }) => [...allTags, ...ustensils], []);
        return Array.from(new Set(allTags))
    }

    arrayFromValuesRequests() {
        const tagsEl = Array.from(document.querySelectorAll('.tag'))
        const inputValue = document.querySelector("#searchBar > form > input").value
        this.currentValuesRequests = []
        this.currentValuesRequests.push(inputValue)
        tagsEl.forEach(e => this.currentValuesRequests.push(e.innerText))
    }

    // Tests
    filtrerRequete(obj, request) {
        var elementsInvalides = 0;
        if (obj.name !== undefined && obj.name === request) {
            return true;
        } else {
            console.log(elementsInvalides++)
            return false;
        }
    }

}