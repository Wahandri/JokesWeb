# Proyecto_CodeSpace

# Proyecto Final: Chistes Divertidos

¡Bienvenido a mi proyecto final de aprendizaje en la Academia CodeSpace! En este proyecto, he creado una aplicación web que te permitirá disfrutar de una colección de chistes divertidos y pasar un buen rato riendo, puntuando o subiendo tus propios chistes.

## Características Destacadas

- Explora una amplia colección de chistes divertidos en un entorno amigable.
- Regístrate e inicia sesión para interactuar con la comunidad y puntuar los chistes de los demás usuarios.
- Agrega tus propios chistes: como usuario registrado, tienes la opción de contribuir a la diversión añadiendo nuevos chistes a la colección.
- Filtra y busca chistes: utiliza el sistema de filtrado para encontrar chistes basados en palabras clave o autores.
- Escucha los chistes: cada chiste tiene una opción para escucharlo en formato de audio, dándole un toque único a la experiencia.
- Reacciona a los chistes con un amigable sistema de puntuación basado en emojis (😕​😐​🙂​🤭​😂​) al puntuar veras la reacción media de entre todos los usuarios que votaron.
- Añade los chistes que mas te gusten a tu propia lista de favoritos desde tu perfil.
- En tu perfil también podrás ver tus chistes añadidos, escucharlos o eliminarlos.

## Tecnologías Utilizadas

- **Frontend:** React, React Router, Context API para la gestión de usuarios, estilos personalizados con CSS.
- **Backend:** Node.js, Express.js, MongoDB como base de datos.
- **Funcionalidad de Voz:** Web Speech API para permitir a los usuarios escuchar los chistes en voz alta.
- **Sistema de Registro y Autenticación:** Implementado con seguridad y privacidad en mente.
- **Sistema de Votación y Contribuciones:** Los usuarios pueden dar "Me gusta" a los chistes y contribuir con nuevos chistes.
- **Filtrado de Chistes:** Sistema de búsqueda y filtrado para encontrar chistes específicos.

# Endpoints de la API

A continuación, se detallan los endpoints de la API de esta aplicación:

| **Ruta**                                           | **Método** | **Descripción**                                                         |
| ------------------------------------------------- | ---------- | ----------------------------------------------------------------------- |
| `/api/jokes`                                      | GET        | Recibe una lista de chistes con opciones de paginación, filtrado y ordenación. |
| `/api/jokes/alljokes`                            | GET        | Recibe todos los chistes sin filtros.                                    |
| `/api/jokes/create`                              | POST       | Crea un nuevo chiste y lo guarda en la base de datos.                   |
| `/api/jokes/random`                              | GET        | Obtiene un chiste aleatorio de la base de datos.                        |
| `/api/jokes/:id/favorite`                        | POST       | Agrega un chiste a la lista de favoritos de un usuario.                 |
| `/api/jokes/:chisteId/vote`                      | POST       | Permite a un usuario votar por un chiste y actualiza su puntuación.    |
| `/api/jokes/:chisteId/average-score`             | GET        | Obtiene la puntuación promedio de un chiste.                            |
| `/api/jokes/:id/favorite`                        | DELETE     | Elimina un chiste de la lista de favoritos de un usuario.               |
| `/api/jokes/:id`                                 | DELETE     | Elimina un chiste de la base de datos por su ID.                        |
| `/api/auth`                                      | POST       | Verifica la contraseña encriptada del usuario para iniciar sesión.      |
| `/api/users/:userId/favorite-jokes`              | GET        | Obtiene la lista de chistes favoritos de un usuario.                   |
| `/api/users`                                     | GET        | Obtiene una lista de usuarios con opciones de paginación.               |
| `/api/users/change/:id`                          | PUT        | Modifica los datos de un usuario existente.                             |
| `/api/users/create`                              | POST       | Crea un nuevo usuario y lo guarda en la base de datos.                 |
| `/api/users/:id`                                 | DELETE     | Cambia el estado de un usuario a inactivo o lo elimina de la base de datos. |


## Cómo Empezar

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del frontend y backend utilizando `npm install` en las carpetas respectivas.
3. Asegúrate de tener una instancia de MongoDB en ejecución.
4. Configura las variables de entorno necesarias en un archivo `.env`.
5. Inicia el servidor backend con el comando `npm start`.
6. Inicia la aplicación frontend con el comando `npm start`.

## Contribuciones y Retroalimentación

Este proyecto es el resultado de mi aprendizaje y esfuerzo. Si tienes sugerencias, encuentras errores o quisieras contribuir con nuevas características, ¡estoy emocionado por escuchar tu opinión! Envía un pull request o contáctame directamente.

## Contacto

Si tienes alguna pregunta o comentario, no dudes en contactarme en [wahandricode@gmail.com](mailto:wahandricode@gmail.com).

Espero que disfrutes riendo con los chistes y que esta aplicación te ayude a aprender y practicar nuevas habilidades. ¡Diviértete explorando y riendo a carcajadas!

