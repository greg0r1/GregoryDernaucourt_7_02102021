import { recipes } from '../../JSON/Recipes.js';


export default class DataService {

    constructor() {
        this.recipes = []
        this.currentValuesRequests = []
    }

    /**
     *
     *
     * @returns
     * @memberof DataService
     */
    getRecipes() {
        const recipesFromJson = recipes
        return this.recipes = recipesFromJson
    }

    /**
     * Filter recipes by search bar
     *
     * @param {*} [arr=[]]
     * @param {string} [request='']
     * @memberof DataService
     */
    filter(arr = [], request = '') {
        request = request.toLowerCase()
        if (!request) {
            this.getRecipes()
        } else {
            this.recipes = arr.filter(({ name, description, ingredients }) => {
                const isIngredient = ingredients.filter(({ ingredient }) =>
                    ingredient.toLowerCase().includes(request)
                )
                return ((name.toLowerCase().indexOf(request.toLowerCase())) > -1 || (description.toLowerCase().indexOf(request))) > -1 || isIngredient.lentgh > 0
            })
        }
    }

    /**
     * Filter tags by ustensils
     *
     * @param {*} request
     * @memberof DataService
     */
    filterRecipesByTagUstensils(request) {
        this.recipes = this.recipes.filter(({ ustensils }) => {
            const isUstensils = ustensils.filter(ustensil => {
                return ustensil.toLowerCase() == request.toLowerCase()
            })
            return isUstensils[0] != undefined
        })
    }

    /**
     * Filter tags by appliance
     *
     * @param {*} request
     * @memberof DataService
     */
    filterRecipesByTagAppliance(request) {
        this.recipes = this.recipes.filter(({ appliance }) => {
            return appliance == request
        })
    }

    /**
     * Filter tags by ingredients
     *
     * @param {*} request
     * @memberof DataService
     */
    filterRecipesByTagIngredients(request) {
        this.recipes = this.recipes.filter(({ ingredients }) => {
            const isIngredient = ingredients.filter(({ ingredient }) =>
                ingredient.toLowerCase().includes(request.toLowerCase())
            )
            return isIngredient[0] != undefined
        })
    }

    /**
     * Get tags for display to input field appliance
     *
     * @returns
     * @memberof DataService
     */
    getTagsAppliance() {
        const allTags = []
        this.recipes.forEach(element => {
            if (allTags.findIndex(e => e.toLowerCase() === element.appliance.toLowerCase()) === -1) {
                allTags.push(element.appliance.toLowerCase())
            }
        })
        return allTags
    }

    /**
     * Get tags for display to input field ustensils
     *
     * @returns
     * @memberof DataService
     */
    getTagsUstensils() {
        const allTags = this.recipes.reduce(
            (allTags, { ustensils }) => [...allTags, ...ustensils], []);
        return Array.from(new Set(allTags))
    }

    /**
     * Get tags for display to input field ingredients
     *
     * @returns
     * @memberof DataService
     */
    getTagsIngredients() {
        const allTags = []
        this.recipes.forEach(e => e.ingredients.forEach(element => {
            if (allTags.indexOf(element.ingredient.toLowerCase()) === -1) {
                allTags.push(element.ingredient.toLowerCase())
            }
        }))
        return allTags
    }

    /**
     * Filter inputs tags
     *
     * @param {*} array
     * @param {*} request
     * @returns
     * @memberof DataService
     */
    filterTagsInputs(array, request) {
        let result = array.filter(e => e.includes(request.toLowerCase()))
        return result
    }

    /**
     * Get displayed request values
     *
     * @memberof DataService
     */
    getDisplayedRequestValues() {
        const tagsEl = Array.from(document.querySelectorAll('.tag'))
        const inputValue = document.querySelector("#searchBar > form > input").value
        this.currentValuesRequests = []
        this.currentValuesRequests.push(inputValue)
        tagsEl.forEach(e => this.currentValuesRequests.push(e.innerText))
    }


}