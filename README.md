# StockPilot - Simple Product Management API

## Description

The Simple Product Management API is a RESTful service built using Node.js and Express.js that allows users to manage a list of products. Users can perform CRUD (Create, Read, Update, Delete) operations on products, which are stored in a PostgreSQL database using Sequelize ORM. The API provides functionality to add, retrieve, update, and delete products, ensuring proper validation and error handling throughout the process.

## Features

- **CRUD Operations**: Create, read, update, and delete products.
- **Data Validation**: Enforces required fields and types for product attributes.
- **Error Handling**: Returns appropriate HTTP status codes and messages for various scenarios.
- **Pagination**: Supports pagination for the product listing to improve performance.
- **Search Functionality**: Allows users to search for products based on name or category.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Web application framework for Node.js.
- **PostgreSQL**: Relational database for storing product data.
- **Sequelize**: ORM for managing database operations in a structured way.
- **dotenv**: Module to load environment variables from a `.env` file.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/simple-product-management-api.git
