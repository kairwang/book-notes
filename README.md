# My Book Notes

## Overview

This project is a web application for managing book notes. Users can add, edit, and view books along with their ratings, read dates, cover images, and short reviews. Additionally, the app allows users to mark books as favorites or to-read.

## Features

- Add new books with details such as title, author, rating, read date, ISBN, and a short review.
- Edit existing book details.
- View a list of all books, with options to filter by favorites and to-read.
- Automatically fetch book cover images using the Open Library Covers API.
- Responsive design using Bootstrap for a seamless user experience on different devices.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **EJS**: Embedded JavaScript templating.
- **PostgreSQL**: Relational database management system.
- **Axios**: Promise-based HTTP client integrating API.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/book-notes.git
   cd book-notes
   
2. **Install dependencies:**
   ```bash
   npm install
   
3. **Set up PostgreSQL:**
 
   Ensure PostgreSQL is installed and running on your machine.
   Create a new database named book_notes.
   Set password and port to match your PostgreSQL preferences.
   
5. **Initialize Database Schema:**

   Copy the command from the queries.sql file into PostgreSQL. (Tip: Use pgAdmin4)

6. **Start Application:**
   ```bash
   npm start
   ```
   Open this web application on `http://localhost:3000`.

### License
This project is licensed under the MIT License.

