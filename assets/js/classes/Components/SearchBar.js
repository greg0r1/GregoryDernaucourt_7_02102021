export default class SearchBar {

    /**
     * Render HTML
     *
     * @static
     * @memberof SearchBar
     */
    static render() {
        document.getElementById('searchBar').innerHTML =
            `
        <form
            class="search form-inline d-flex justify-content-between md-form form-sm w-100 p-3 flex-nowrap rounded">
                <input class="border-0 bg-transparent d-inline-flex w-100" type="text"
                    placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
                    aria-label="Rechercher un ingrédient, appareil, ustensiles ou une recette">
                <img src="assets/images/icons/search.svg" class="" width="25" height="25" alt="">
        </form>
        `
    }
}