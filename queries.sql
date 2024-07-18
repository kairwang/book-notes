-- Create books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    rating NUMERIC,  -- You can change this to TEXT if you prefer
    read_date DATE,  -- You can change this to TEXT if you prefer
    cover_url TEXT,
    isbn TEXT UNIQUE
);
