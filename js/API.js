const baseURL = 'https://sleepy-chamber-15932.herokuapp.com/api';


// Función que se encargará de traer la lista de todos los productos
export const getProducts = async () => {
    try {
        const result = await fetch(`${baseURL}/products`);
        const response = await result.json();

        return response;

    } catch (error) {
        console.log(error);
    };
};

// Función que se encargará de traer la lista de todas los categorías
export const getCategories = async () => {
    try {
        const result = await fetch(`${baseURL}/categories`);
        const response = await result.json();

        return response;

    } catch (error) {
        console.log(error);
    };
};

// Función que se encargará de traer los productos que pertenezcan a cierta categoría
export const getProductsByCategory = async (idCategory) => {
    try {
        const result = await fetch(`${baseURL}/category/${idCategory}`);
        const response = await result.json();

        return response;

    } catch (error) {
        console.log(error);
    }
};

/* Función que se encargará de traer a los productos con filtrado por nombre y por página (query param
    'name' es manejado en el backend en la función 'index()' del controlador ProductController) */
export const getFilteredProduts = async (keyword, currentPage) => {
    try {
        const result = await fetch(`${baseURL}/products?name=${keyword}&page=${currentPage}`);
        const response = await result.json();

        return response;

    } catch (error) {
        console.log(error);
    };
};