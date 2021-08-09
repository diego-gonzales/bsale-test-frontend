const baseURL = 'http://localhost:8000/api';


export const getProducts = async () => {
    try {
        const result = await fetch(`${baseURL}/products`);
        const response = await result.json();

        return response;

    } catch (error) {
        console.log(error);
    };
};

export const getCategories = async () => {
    try {
        const result = await fetch(`${baseURL}/categories`);
        const response = await result.json();

        return response;

    } catch (error) {
        console.log(error);
    };
};

export const getProductsByCategory = async (idCategory) => {
    try {
        const result = await fetch(`${baseURL}/category/${idCategory}`);
        const response = await result.json();

        return response;

    } catch (error) {
        console.log(error);
    }
};

export const getFilteredProduts = async (keyword, currentPage) => {
    try {
        const result = await fetch(`${baseURL}/products?name=${keyword}&page=${currentPage}`);
        const response = await result.json();

        return response;

    } catch (error) {
        console.log(error);
    };
};