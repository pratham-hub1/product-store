# Product Store

A React application that lists a product inventory and lets you browse, search,
filter and manage a shopping cart. Built as a practical assignment.

## Features

- **Product inventory** — 14 products with ID, name, category, price, stock
  quantity and image.
- **Product list** — responsive card grid with stock status and rating.
- **Search** — instant search by product name or category.
- **Category filter** — All / Electronics / Furniture / Stationery / Accessories,
  also selectable from the home page and shareable via the URL.
- **Sorting** — by price (low/high) and name.
- **Product details page** — full description, price, stock, quantity selector
  and related products.
- **Shopping cart** — add products, increase/decrease quantity, remove items,
  clear the cart, and see a live total with delivery charges.
- **Cart persistence** — the cart is saved to `localStorage`, so it survives a
  page refresh.
- **Demo checkout** — a simple confirmation screen (no real payment).

## Tech stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| UI library     | React 18 (ES6, JSX, functional components) |
| Routing        | React Router v6                          |
| Build tool     | Vite 5                                   |
| Styling        | Plain CSS (`src/index.css`)              |
| State          | React Context + `useState` / `useMemo`   |
| Persistence    | Browser `localStorage`                   |

### React concepts demonstrated

ES6, JSX, functional components, props, events, conditional rendering, lists
(`map`), forms (search, filter, quantity), React Router (routes, `Link`,
`NavLink`, `useParams`, `useSearchParams`), CSS styling, and `useMemo` for
derived/filtered values.

## Getting started

You need **Node.js 18+** and npm installed.

```bash
# 1. install dependencies
npm install

# 2. start the dev server (opens http://localhost:5173)
npm run dev

# 3. build for production (output in dist/)
npm run build

# 4. preview the production build locally
npm run preview
```

## Project structure

```
product-store/
├── index.html               # Vite HTML entry
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── products/            # product images (SVG)
└── src/
    ├── main.jsx             # app entry: Router + CartProvider
    ├── App.jsx              # layout + routes
    ├── index.css            # all styling
    ├── data/
    │   └── products.js      # product inventory + helpers
    ├── context/
    │   └── CartContext.jsx  # cart state + localStorage + useMemo totals
    ├── utils/
    │   └── format.js        # INR currency formatter
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   ├── SearchBar.jsx
    │   ├── CategoryFilter.jsx
    │   ├── QuantityStepper.jsx
    │   └── EmptyState.jsx
    └── pages/
        ├── Home.jsx
        ├── Products.jsx
        ├── ProductDetails.jsx
        ├── Cart.jsx
        └── NotFound.jsx
```

## Routes

| Path             | Page            |
| ---------------- | --------------- |
| `/`              | Home            |
| `/products`      | Product list    |
| `/products/:id`  | Product details |
| `/cart`          | Shopping cart   |
| `*`              | 404 Not found   |

## Pushing to GitHub

The project is ready to push. From inside the project folder:

```bash
git init
git add .
git commit -m "Initial commit: Product Store React app"

# create an empty repo on GitHub first (do NOT add a README there),
# then connect it and push:
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`node_modules/` and `dist/` are already ignored via `.gitignore`, so only the
source is committed.

## Notes

- All prices are in Indian Rupees (₹) and formatted with the Indian numbering
  system.
- Product images are local SVG files under `public/products/`, so the app works
  completely offline with no external image requests.
