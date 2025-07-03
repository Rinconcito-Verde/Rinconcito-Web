CREATE TABLE category (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    sort_order INTEGER
);

CREATE TABLE product (
    id INTEGER PRIMARY KEY,  
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    short_description TEXT, 
    price REAL NOT NULL, 
    discount REAL NOT NULL DEFAULT 0,  
    sales_tax REAL NOT NULL DEFAULT 0, 
    currency TEXT NOT NULL,  
    sort_order INTEGER NOT NULL DEFAULT 0,  
    image TEXT, 
    type TEXT NOT NULL, 
    expiration_date TEXT, 
    created_at TEXT, 
    updated_at TEXT,  
    category_id INTEGER NOT NULL, 
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE cart (
    id TEXT PRIMARY KEY
);

CREATE TABLE cart_items (
    id INTEGER PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    cart_id TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE
    UNIQUE (cart_id, product_id) 
);


CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  attempts INTEGER DEFAULT 0
);