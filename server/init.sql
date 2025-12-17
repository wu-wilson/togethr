-- Create the database (run this separately if not already connected)
-- CREATE DATABASE togethr;

-- Switch to the database (psql: \c togethr)

-- Remove existing schema objects if they exist
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS transactions;

-- Create members table
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    color VARCHAR(7) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(7) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    description TEXT,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    transaction_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);