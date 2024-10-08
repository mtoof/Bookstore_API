### Bookstore API

This is a simple project to demonstrate how to use `MongoDB` with `Express.js`. The project is a simple REST API that allows you to create, read, update and delete objects from a MongoDB database.
I have dockerized all the project.

### Installation

Make sure you have docker installed on your machine.
Simply run the following command to start the project:

```bash
make # To run the project
```



This will start a MongoDB container and an Express.js container. The Express.js container will be available on port 3000.

### Usage

You can use the following endpoints to interact with the API:

`/books` - GET - Get all books

`/books/:id` - GET - Get a book by id

`/books/` - POST - Create a new book

`/books/:id` - PUT - Update a book by id

`/books/:id` - DELETE - Delete a book by id

### Stop and deleting the containers

```bash
make down # To stop the project
make clean # To delete all the containers
```
