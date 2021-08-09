import { getProducts, getCategories, getProductsByCategory, getFilteredProduts } from "./API.js";


const result = document.querySelector('#result');
const divCategories = document.querySelector('#categories');
const form = document.querySelector('#form');
const divPagination = document.querySelector('#pagination');
const divSpinner = document.createElement('div');

let totalPages;
let iterator;
let currentPage = 1;

window.onload = async () => {
    await showAllProducts(),
    form.addEventListener('submit', validateForm);
};

async function showAllProducts() {
    try {
        showSpinner();
        divPagination.classList.add('hidden');

        const { data, last_page } = await getProducts();
        const categories = await getCategories();

        removeSpinner();
        divPagination.classList.remove('hidden');

        totalPages = last_page;
        showProducts(data);
        showCategories(categories);

    } catch (error) {
        console.log(error);
    }
};


function validateForm(e) {
    e.preventDefault();

    const keyword = document.querySelector('#keyword').value;

    if (keyword.trim() === '') return;

    currentPage = 1;

    searchProducts(keyword);
};

function showAlert(message, error) {

    cleanDivResult();
    cleanDivPagination();

    const alertElement = document.querySelector('.bg-red-100');

    if (!alertElement) {
        const alert = document.createElement('p');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
        alert.innerHTML = `
            <strong class="font-bold">Message:</strong>
            <span class="block sm:inline">${message}</span>
        `;

        result.appendChild(alert);

        if (error) {
            setTimeout(() => {
                alert.remove();
            }, 2000);
        };
    };
};


async function searchProducts() {
    // isLoading = true;
    const keyword = document.querySelector('#keyword').value;

    try {
        showSpinner();
        divPagination.classList.add('hidden');

        const { data, last_page } = await getFilteredProduts(keyword, currentPage);

        removeSpinner();
        divPagination.classList.remove('hidden');

        totalPages = last_page;
        showProducts(data);

    } catch (error) {
        console.log(error);
    };
};

function showProducts(products) {
    cleanDivResult();

    if (!products.length) {
        showAlert('Not found results', false);
        cleanDivPagination();
        return;
    };

    products.forEach(product => {
        const { name, url_image, price, discount } = product;

        const img = url_image || 'https://icon-library.com/images/no-image-available-icon/no-image-available-icon-7.jpg';

        result.innerHTML += `
            <div class="col-md-4 col-lg-3 p-3 mb-4 max-w-md mx-auto text-center">
                <div class="card shadow">
                    <div class="card-body justify-content-center">
                        <img class="w-full" src="${img}" alt="${name}">
                        <h3 class="mb-4"> ${name} </h3>
                        <hr>
                        <div class="row mt-3 justify-content-between">
                            <div class="col-6">
                                <p> $${price} </p>
                            </div>
                            <div class="col-6">
                                <a href="#">
                                    <i class="fas fa-cart-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    cleanDivPagination();

    printPaginator();
};

function showCategories(categories) {
    divCategories.classList.remove('hidden');
    categories.forEach( ({id, name}) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('mr-2', 'mb-1' , 'btn', 'btn-outline-dark');
        button.textContent = name.toUpperCase();

        button.onclick = async () => {
            showSpinner();
            cleanDivPagination();
            const products = await getProductsByCategory(id);
            removeSpinner();
            showProducts(products);
            cleanDivPagination();
        };

        divCategories.appendChild(button);
    });
}

function printPaginator() {
    iterator = createPaginator(totalPages);

    while (true) {
        const { value, done } = iterator.next();

        if (done) return;

        const button = document.createElement('a');
        button.href = '#';
        button.dataset.page = value;
        button.textContent = value;
        button.classList.add('next', 'bg-gray-900', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');

        button.onclick = () => {
            currentPage = value;
            searchProducts();
        };

        divPagination.appendChild(button);
    };
};

function *createPaginator(totalPages) {
    for (let i = 1; i <= totalPages; i++) {
        yield i;
    };
};


function showSpinner() {
    cleanDivResult();
    divSpinner.innerHTML = `
        <div class="sk-circle">
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
        </div>
    `;
    result.appendChild(divSpinner);
};

function removeSpinner() {
    divSpinner.remove();
};

function cleanDivResult() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    };
};

function cleanDivPagination() {
    while (divPagination.firstChild) {
        divPagination.removeChild(divPagination.firstChild);
    };
};
