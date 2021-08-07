const result = document.querySelector('#result');
const form = document.querySelector('#form');
const divPagination = document.querySelector('#pagination');
const loading = document.createElement('div');

let totalPages;
let iterator;
let currentPage = 1;
let isLoading = false;


window.onload = () => {
    form.addEventListener('submit', validateForm);
};

function validateForm(e) {
    e.preventDefault();

    const keyword = document.querySelector('#keyword').value;

    if (keyword.trim() === '') {
        showAlert('You need add a keyword');
        return;
    };

    currentPage = 1;

    searchProducts(keyword);
};

function showAlert(message) {
    const alertElement = document.querySelector('.bg-red-100');

    if (!alertElement) {
        const alert = document.createElement('p');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
        alert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${message}</span>
        `;

        result.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 2000);
    };
};


async function searchProducts() {
    // isLoading = true;
    const keyword = document.querySelector('#keyword').value;
    const url = `http://127.0.0.1:8000/api/products?name=${keyword}&page=${currentPage}`;

    try {
        showLoading('Searching products, please wait a moment...');

        const response = await fetch(url);
        const { data, last_page } = await response.json();

        removeLoading();

        totalPages = last_page;
        showProducts(data);

    } catch (error) {
        console.log(error);
    };
};

function showProducts(products) {
    cleanDivResult();

    if (!products.length) {
        showLoading('Not found results');
        cleanDivPagination();
        return;
    };

    products.forEach(product => {
        const { name, url_image, price, discount } = product;

        result.innerHTML += `
            <div class="col-md-4 col-lg-3 p-3 mb-4 text-center">
                <div class="card">
                    <div class="card-body">
                        <img class="w-full" src="${url_image}" alt="${name}">
                        <h3 class="font-bold"> ${name} </h3>
                    </div>
                    <div class="card-footer">
                        <div class="row mt-2 justify-content-between">
                            <div class="col-6">
                                <p class=""> $${price} </p>
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


function showLoading(message) {
    cleanDivResult();
    loading.classList.add('alert', 'alert-primary', 'd-flex', 'justify-content-center');
    loading.textContent = message;
    result.appendChild(loading);
};

function removeLoading() {
    loading.remove();
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
}