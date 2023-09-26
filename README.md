# Proyecto_CodeSpace

## Proyecto Final: Web de Chistes

¡Bienvenido a mi proyecto final de aprendizaje en la Academia CodeSpace! En este proyecto, he creado una aplicación web que te permitirá disfrutar de una colección de chistes divertidos y así pasar un buen rato riendo, puntuando o subiendo tus propios chistes.

### Características Destacadas

- Explora una amplia colección de chistes divertidos en un entorno amigable.
- Regístrate e inicia sesión para interactuar con la comunidad y puntuar los chistes de los demás usuarios.
- Agrega tus propios chistes: como usuario registrado, tienes la opción de contribuir a la diversión añadiendo nuevos chistes a la colección.
- Filtra y busca chistes: utiliza el sistema de filtrado para encontrar chistes basados en palabras clave o autores.
- Escucha los chistes: cada chiste tiene una opción para escucharlo en formato de audio, dándole un toque único a la experiencia.
- Reacciona a los chistes con un amigable sistema de puntuación basado en emojis (😕 😐 🙂 🤭 😂). Al puntuar, verás la reacción media de entre todos los usuarios que votaron.
- Añade los chistes que más te gusten a tu propia lista de favoritos desde tu perfil.
- En tu perfil también podrás ver tus chistes añadidos, escucharlos o eliminarlos.

### Tecnologías Utilizadas

- **Frontend:** React, React Router, Context API para la gestión de usuarios, estilos personalizados con CSS.
- **Backend:** Node.js, Express.js, MongoDB como base de datos.
- **Funcionalidad de Voz:** Web Speech API para permitir a los usuarios escuchar los chistes en voz alta.
- **Sistema de Registro y Autenticación:** Implementado con seguridad y privacidad en mente.
- **Sistema de Votación y Contribuciones:** Los usuarios pueden dar "Me gusta" a los chistes y contribuir con nuevos chistes.
- **Filtrado de Chistes:** Sistema de búsqueda y filtrado para encontrar chistes específicos.

### Endpoints API

### /jokes

#### Recibir lista de Chistes (orden inverso)

- **URL:** `/api/jokes`
- **Método:** GET
- **Descripción:** Recibe una lista de chistes con opciones de paginación, filtrado y ordenación.
- **Parámetros de consulta:**
  - `page` (opcional): Página actual de resultados.
  - `filter` (opcional): Filtrar por texto del chiste o autor.
  - `sortByScore` (opcional): Ordenar por puntuación descendente.
- **Respuesta:** Devuelve una lista de chistes y el número total de chistes que coinciden con los filtros.

#### Recibir TODOS los chistes

- **URL:** `/api/jokes/alljokes`
- **Método:** GET
- **Descripción:** Recibe todos los chistes sin filtros.
- **Respuesta:** Devuelve una lista de todos los chistes.

#### CREAR CHISTE (Joke)

- **URL:** `/api/jokes/create`
- **Método:** POST
- **Descripción:** Crea un nuevo chiste y lo guarda en la base de datos.
- **Cuerpo de la solicitud:** Debe incluir el texto del chiste y el autor.
- **Respuesta:** Devuelve el chiste creado.

#### Obtener un chiste aleatorio

- **URL:** `/api/jokes/random`
- **Método:** GET
- **Descripción:** Obtiene un chiste aleatorio de la base de datos.
- **Respuesta:** Devuelve un chiste aleatorio.

#### Agregar un chiste a favoritos

- **URL:** `/api/jokes/:id/favorite`
- **Método:** POST
- **Descripción:** Agrega un chiste a la lista de favoritos de un usuario.
- **Parámetros de ruta:** `id` (ID del chiste).
- **Cuerpo de la solicitud:** Debe incluir el ID del usuario.
- **Respuesta:** Devuelve la lista actualizada de chistes favoritos del usuario.

#### Votar por un chiste

- **URL:** `/api/jokes/:chisteId/vote`
- **Método:** POST
- **Descripción:** Permite a un usuario votar por un chiste y actualiza su puntuación.
- **Parámetros de ruta:** `chisteId` (ID del chiste).
- **Cuerpo de la solicitud:** Debe incluir la puntuación y el correo electrónico del usuario.
- **Respuesta:** Confirma que se ha registrado el voto.

#### Obtener la puntuación promedio de un chiste

- **URL:** `/api/jokes/:chisteId/average-score`
- **Método:** GET
- **Descripción:** Obtiene la puntuación promedio de un chiste.
- **Parámetros de ruta:** `chisteId` (ID del chiste).
- **Respuesta:** Devuelve la puntuación promedio del chiste.

#### Eliminar un chiste de favoritos

- **URL:** `/api/jokes/:id/favorite`
- **Método:** DELETE
- **Descripción:** Elimina un chiste de la lista de favoritos de un usuario.
- **Parámetros de ruta:** `id` (ID del chiste).
- **Cuerpo de la solicitud:** Debe incluir el ID del usuario.
- **Respuesta:** Devuelve la lista actualizada de chistes favoritos del usuario.

#### Eliminar un chiste de la base de datos por su ID

- **URL:** `/api/jokes/:id`
- **Método:** DELETE
- **Descripción:** Elimina un chiste de la base de datos por su ID.
- **Parámetros de ruta:** `id` (ID del chiste).
- **Respuesta:** Confirma que se ha eliminado el chiste.

---------------------------------------------------

### /auth

#### Verificación de contraseña encriptada

- **URL:** `/api/auth`
- **Método:** POST
- **Descripción:** Verifica la contraseña encriptada del usuario para iniciar sesión.
- **Cuerpo de la solicitud:** Debe incluir el correo electrónico y la contraseña del usuario.
- **Respuesta:** Devuelve un token de autenticación si la contraseña es correcta.

---------------------------------------------------

### /user

#### Recibir Chistes Favoritos

- **URL:** `/api/users/:userId/favorite-jokes`
- **Método:** GET
- **Descripción:** Obtiene la lista de chistes favoritos de un usuario.
- **Parámetros de ruta:** `userId` (ID del usuario).
- **Respuesta:** Devuelve la lista de chistes favoritos del usuario.

#### Recibir lista de usuarios

- **URL:** `/api/users`
- **Método:** GET
- **Descripción:** Obtiene una lista de usuarios con opciones de paginación.
- **Parámetros de consulta:**
  - `page` (opcional): Página actual de resultados.
- **Respuesta:** Devuelve una lista de usuarios activos.

#### Cambiar usuario

- **URL:** `/api/users/change/:id`
- **Método:** PUT
- **Descripción:** Modifica los datos de un usuario existente.
- **Parámetros de ruta:** `id` (ID del usuario).
- **Cuerpo de la solicitud:** Puede incluir el nombre de usuario, correo electrónico o contraseña del usuario.
- **Respuesta:** Devuelve el usuario actualizado.

#### Crear usuario

- **URL:** `/api/users/create`
- **Método:** POST
- **Descripción:** Crea un nuevo usuario y lo guarda en la base de datos.
- **Cuerpo de la solicitud:** Debe incluir el nombre de usuario, correo electrónico y contraseña.
- **Respuesta:** Devuelve el usuario creado.

#### Borrar usuario

- **URL:** `/api/users/:id`
- **Método:** DELETE
- **Descripción:** Cambia el estado de un usuario a inactivo o lo elimina de la base de datos.
- **Parámetros de ruta:** `id` (ID del usuario).
- **Cuerpo de la solicitud:** Puede incluir la propiedad `active` para desactivar o activar al usuario.
- **Respuesta:** Devuelve el usuario actualizado.

---------------------------------------------------

### Cómo Empezar

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del frontend y backend utilizando `npm install` en las carpetas respectivas.
3. Asegúrate de tener una instancia de MongoDB en ejecución.
4. Configura las variables de entorno necesarias en un archivo `.env`.
5. Inicia el servidor backend con el comando `npm start`.
6. Inicia la aplicación frontend con el comando `npm start`.

### Contribuciones y Retroalimentación

Este proyecto es el resultado de mi aprendizaje y esfuerzo. Si tienes sugerencias, encuentras errores o quisieras contribuir con nuevas características, ¡estoy emocionado por escuchar tu opinión! Envía un pull request o contáctame directamente.

### Contacto

Si tienes alguna pregunta o comentario, no dudes en contactarme en [wahandricode@gmail.com](mailto:wahandricode@gmail.com).

Espero que disfrutes riendo con los chistes y que esta aplicación te ayude a aprender y practicar nuevas habilidades. ¡Diviértete explorando y riendo a carcajadas!
