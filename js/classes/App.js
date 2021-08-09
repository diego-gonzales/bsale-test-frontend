import { showAllProducts, validateForm } from "../functions.js";
import { form } from "../selectors.js";


export class App {
    constructor() {
        this.startApp();
    };

    startApp() {
        window.onload = async () => {
            await showAllProducts(),
            form.addEventListener('submit', validateForm);
        };
    };
}