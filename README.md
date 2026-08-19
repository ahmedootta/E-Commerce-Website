# E-Commerce Website
**OOTA's Site**

## Features

### Display Products

- **Fetch Data from API**: The website dynamically displays a list of products fetched from an external API. This ensures that the product listings are always up-to-date with the latest information from the server.

### Authentication System

- **User Authentication**: The website uses a JSON server to manage user data and handle authentication. Users can register, log in, and log out securely.

### Shopping Cart

- **Add to Cart**: Users can add products to their shopping cart with a single click. The cart functionality is integrated seamlessly with the product listings.
- **Remove from Cart**: Users can easily remove items from their shopping cart, allowing them to manage their selections effortlessly.

### User Profile

- **Personal Information Page**: Each user has a dedicated page where they can view and update their personal information. This page provides a centralized location for managing user details.

### Password Management

- **Reset Password**: Users can reset their password by entering their username and the associated email address. If both match an account in the database, the password reset process will be simulated on the site.

### Product Filtering and Sorting

- **Filter by Category**: Users can filter products by category to easily find items of interest.
- **Sort Products**: Users can sort products based on various criteria.

## Tech Stack

Vanilla JavaScript, HTML, CSS. Product data is fetched live from the [DummyJSON](https://dummyjson.com/products) API and cached in `localStorage`; user accounts/carts are stored in `db.json`, served with a JSON server for the authentication mock.

## Run

```bash
npx json-server --watch db.json --port 3000
```

Then open `index.html` (e.g. via a local static server / Live Server) in the browser.
