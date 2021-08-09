# BSALE-TEST-FRONTEND
### Documentación de Frontend

El frontend fue realizado con Vanilla Javascript, además se usaron herramientas como Bootstrap y Tailwind para dar los estilos a la aplicación. A continuación se explica de manera resumida lo que se realizó:

1. Se divivió la aplicación en diferentes archivos para tener un código más limpio y para que sea de fácil lectura para quien revise el código:
    * Se tiene como archivo principal el *'app.js'*.
    * Luego está el archivo *'App.js'* el cual inicia la aplicación.
    * Está el archivo *'functions.js'* que contiene las funciones que serán usadas a lo largo de la aplicación.
    * El archivo *'API.js'* que es donde se hacen las llamadas a los endpoints de nuestro backend.
    * Y por último está el archivo *'selectors.js'* el cual contiene la referencia a los elementos del DOM.
2. Para empezar se creó una clase (*'classes/App.js'* la cual se instancia en el archivo *'app.js'*) y es la que inicia la aplicación con su método *'startApp()'*.
3. En la clase App.js, al iniciar la app, se llama al método *'showAllProducts()'* el cual es el encargado de cargar todos los productos después de traer la data de la API, Adémas de esto, también ahí mismo se agrega un event listener que estará a la escucha del evento *'submit'* del pequeño formulario creado para hacer la búsqueda de un producto.
4. Y creo que eso sería lo básico que hay que explicar, ya que lo resto solo es lógica de programación.