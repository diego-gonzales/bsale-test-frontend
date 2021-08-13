// Tomamos referencia de los elementos del DOM

/* Toma referecia de la etiqueta 'div' con id="result" del DOM
el cual servirá para mostrar los productos que existen, que fueron filtrados
por su categoría o que fueron buscados*/
export const result = document.querySelector('#result');

/* Toma referecia de la etiqueta 'div' con id="categories" del DOM
el cual me servirá para mostrar las categorías que existen */
export const divCategories = document.querySelector('#categories');

/* Toma referecia de la etiqueta 'form' con id="form" del DOM
el cual servirá como buscador de los productos que el usuario desee */
export const form = document.querySelector('#form');

/* Toma referecia de la etiqueta 'div' con id="pagination" del DOM
el cual me servirá para agregar la paginación a mi aplicación */
export const divPagination = document.querySelector('#pagination');

/* Crea una nueva etiqueta 'div' que se encargará de mostrar un spinner 
mientras se están trayendo los datos del servidor */
export const divSpinner = document.createElement('div');