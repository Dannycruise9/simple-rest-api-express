# Simple REST API with Express.js

This project is a simple RESTful API built with Node.js and Express.js to manage a list of items. It supports all standard CRUD (Create, Read, Update, Delete) operations.

## Technologies Used
- Express.js

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd simple-api
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:3000`.

---

## API Documentation

### Base URL
`http://localhost:3000`

### Endpoints

#### 1. Get All Items
-   **Method:** `GET`
-   **URL:** `/items`
-   **Description:** Retrieves a list of all items.
-   **Success Response (200 OK):**
    ```json
    [
        { "id": 1, "name": "Laptop", "description": "A high-performance laptop for development." },
        { "id": 2, "name": "Keyboard", "description": "A mechanical keyboard with RGB lighting." }
    ]
    ```

#### 2. Get a Single Item
-   **Method:** `GET`
-   **URL:** `/items/:id`
-   **Description:** Retrieves a single item by its unique ID.
-   **Success Response (200 OK):**
    ```json
    { "id": 1, "name": "Laptop", "description": "A high-performance laptop for development." }
    ```
-   **Error Response (404 Not Found):**
    ```json
    { "error": "Item not found" }
    ```

#### 3. Create a New Item
-   **Method:** `POST`
-   **URL:** `/items`
-   **Description:** Creates a new item.
-   **Request Body:**
    ```json
    {
        "name": "New Monitor",
        "description": "A 27-inch 4K display."
    }
    ```
-   **Success Response (201 Created):**
    ```json
    { "id": 4, "name": "New Monitor", "description": "A 27-inch 4K display." }
    ```
-   **Error Response (400 Bad Request):**
    ```json
    { "error": "Name and description are required." }
    ```

#### 4. Update an Item
-   **Method:** `PUT`
-   **URL:** `/items/:id`
-   **Description:** Updates an existing item's details.
-   **Request Body:**
    ```json
    {
        "description": "An updated description for the item."
    }
    ```
-   **Success Response (200 OK):**
    ```json
    { "id": 1, "name": "Laptop", "description": "An updated description for the item." }
    ```
-   **Error Response (404 Not Found):**
    ```json
    { "error": "Item not found" }
    ```

#### 5. Delete an Item
-   **Method:** `DELETE`
-   **URL:** `/items/:id`
-   **Description:** Deletes an item by its ID.
-   **Success Response:** `204 No Content`
-   **Error Response (404 Not Found):**
    ```json
    { "error": "Item not found" }
    ```