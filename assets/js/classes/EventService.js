

export default class EventService {

    static handleSearchBarEvent(call) {
        const array = Array.from(document.querySelectorAll("form.search input")).forEach((element) => {
            element.addEventListener("keyup", () => call(element));
        });
    }

    static handleInputEvent(call) {
        const array = Array.from(document.querySelectorAll("#inputsForm input")).forEach((element) => {
            element.addEventListener("keyup", () => call(element));
        });
    }

    static handleTagsEvent(call) {
        const array = Array.from(document.querySelectorAll(".dropdown-menu a")).forEach((element) => {
            element.addEventListener("click", () => call(element));
        });
    }

    static handleTagsClose(call) {
        const array = Array.from(document.querySelectorAll(".btn-close")).forEach((element) => {
            element.addEventListener("click", () => call(element));
        });
    }
}