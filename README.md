# Videojuegos App

Esta es una aplicación web (SPA) centrada en el mundo de los videojuegos, aprovechando herramientas como React, Redux, Express, Sequelize y Postgres para brindarte una experiencia fluida y amigable.

## Frontend

En el desarrollo Frontend de la aplicación, se emplearon tecnologías como React y Redux.

## Capturas de Pantalla

A continuación, te presento algunas capturas de pantalla que te dan una idea visual de las características más destacadas de la aplicación:

**Página de Inicio:**
![Página de Inicio](https://i.ibb.co/w6kPKTf/Landing-page.jpg)

**Inicio:**
![Inicio](https://i.ibb.co/KVFCrfd/Home.jpg)

**Filtros:**
![Filtros](https://i.ibb.co/FBMbBXw/Filters.jpg)

**Detalles del Juego:**
![Detalles del Juego](https://i.ibb.co/8b3fwnm/Details-game.jpg)

**Crear Juego:**
![Crear Juego](https://i.ibb.co/DYC7GKm/Create-game.jpg)

### Iniciar la Aplicación desde el lado del Frontend:

Si deseas ejecutar la aplicación en tu entorno local, sigue estos sencillos pasos:

1. Navega hasta la carpeta principal del cliente:
   ```bash
   cd client
   ```

2. Instala las dependencias de la aplicación utilizando npm:
   ```bash
   npm install
   ```

3. Inicia la aplicación en modo de desarrollo:
   ```bash
   npm start
   ```

4. Abre tu navegador web y visita http://localhost:3000 para explorar la aplicación.

## Backend

La sección de backend de la aplicación está basada en tecnologías como Node y Express, y se implementan las siguientes rutas esenciales:

- [ ] __GET /videogames__:
  - Obtiene un listado de videojuegos.
  - Proporciona solo los datos esenciales para la ruta principal.

- [ ] __GET /videogames?name="..."__:
  - Obtiene una lista de los primeros 15 videojuegos que contienen la palabra ingresada como parámetro de consulta.
  - Si no se encuentran videojuegos que cumplan el criterio, se muestra un mensaje apropiado.

- [ ] __GET /videogame/{idVideogame}__:
  - Obtiene los detalles de un videojuego en particular.
  - Proporciona solo los datos solicitados para la ruta de detalles del videojuego.
  - Incluye información sobre los géneros asociados.

- [ ] __GET /genres__:
  - Obtiene todos los géneros posibles de videojuegos.
  - En primera instancia, se obtienen desde rawg y luego se almacenan en la base de datos propia para un acceso eficiente.

- [ ] __POST /videogame__:
  - Recibe los datos recopilados del formulario controlado en la ruta de creación de videojuegos a través del cuerpo de la solicitud.
  - Crea un nuevo videojuego en la base de datos.

### Iniciar la Aplicación desde el lado del Backend:

Si tienes curiosidad y quieres probar la aplicación en tu propio entorno, sigue estos pasos:

1. Dirígete a la carpeta principal del servidor:
   ```bash
   cd server
   ```

2. Instala las dependencias de la aplicación utilizando npm:
   ```bash
   npm install
   ```
3. Renombra el archivo ``.env.template`` a ``.env`` y reemplaza los valores de las variables correspondientes. ¡Asegúrate de tener el token de la API de rawg.io!

4. Inicia la aplicación en modo de desarrollo:
   ```bash
   npm start
   ```

4. Abre tu navegador web y visita http://localhost:PORT para explorar la aplicación.