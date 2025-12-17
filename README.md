# AsYourChoice – React E-Commerce Application

AsYourChoice is a modern, responsive *frontend e-commerce web application* built using *React and Vite*.  
The project demonstrates core e-commerce functionalities such as product listing, search, cart management, and real-time price calculations using *Context API* for global state management.


## Features

- Product listing from local JSON data
- Real-time search by product name and category
- Add to cart functionality
- Increase / decrease product quantity
- Remove items from cart
- Dynamic cart count in header
- Automatic subtotal, tax, and total calculation
- Toast notifications for user actions
- Responsive and modern UI

## Tech Stack

- *Frontend Framework:* React (Vite)
- *State Management:* Context API
- *Routing:* React Router DOM
- *Styling:* Tailwind CSS
- *Notifications:* React Toastify
- *Data Source:* Local JSON (products.json)

## Project Structure

bash
src/
├── assets/              # Images and icons
├── components/
│   ├── Header.jsx       # Navigation bar with search and cart
│   └── ProductList.jsx  # Product listing and pagination
├── context/
│   └── CartContext.jsx  # Global cart & search state
├── data/
│   └── products.json    # Product data
├── pages/
│   └── Cart.jsx         # Cart page and order summary
├── App.jsx              # Routing and layout
├── main.jsx             # Application entry point
└── index.css            # Global styles


## Application Workflow

- Application starts from main.jsx
- Entire app is wrapped inside CartProvider
- App.jsx manages routing and global layout
- Header handles navigation, search, and cart count
- ProductList displays products with search & pagination
- Cart actions update global state via CartContext
- Cart page shows selected items and order summary

## State Management

### The application uses React Context API to manage:
- cartItems
- search term

### Cart operations:
- addToCart
- removeFromCart
- increaseQty
- decreaseQty

This ensures unidirectional data flow and consistent UI updates across components.

## Pricing Logic

- Subtotal: Sum of (price × quantity)
- Tax: 5% of subtotal
- Total: Subtotal + Tax
- Shipping is currently free

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

bash
git clone https://github.com/your-username/asyourchoice.git


bash
cd asyourchoice

bash
npm install


Run the Project
bash
npm run dev

Open your browser at:
bash
http://localhost:5173


## Future Enhancements

- Backend integration (REST API)
- User authentication
- Payment gateway integration
- Persistent cart using localStorage or database
- Admin panel for product management

## Author

Soumyajit Singh
Frontend Developer | React Enthusiast
