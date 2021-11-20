

export default class EventService {

    /**
     *
     *
     * @static
     * @param {*} call
     * @memberof EventService
     */
    static handleSearchBarEvent(call) {
        const array = Array.from(document.querySelectorAll("form.search input")).forEach((element) => {
            element.addEventListener("keyup", () => call(element));
        });
    }

    /**
     *
     *
     * @static
     * @param {*} call
     * @memberof EventService
     */
    static handleInputEvent(call) {
        const array = Array.from(document.querySelectorAll("#inputsForm input")).forEach((element) => {
            element.addEventListener("keyup", () => call(element));
        });
    }

    /**
     *
     *
     * @static
     * @param {*} call
     * @memberof EventService
     */
    static handleTagsEvent(call) {
        const array = Array.from(document.querySelectorAll(".dropdown-menu a")).forEach((element) => {
            element.addEventListener("click", () => call(element));
        });
    }

    /**
     *
     *
     * @static
     * @param {*} call
     * @memberof EventService
     */
    static handleTagsClose(call) {
        const array = Array.from(document.querySelectorAll(".btn-close")).forEach((element) => {
            element.addEventListener("click", () => call(element));
        });
    }
}