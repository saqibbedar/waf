# WAF Lab Task 4

## Setup

1. Install Node.js and MongoDB Community Server.
2. Open this folder in VS Code.
3. Copy `.env.example` to `.env` and fill in your credentials.
4. Run `npm install`.

## Environment Variables (`.env`)

```
PORT=3000
REMOTE_URI=<your MongoDB Atlas connection string>
LOCAL_URI=mongodb://localhost:27017/GroceryItems
```

## Import Products (run once)

```bash
node scripts/importProducts.js
```

Reads `assets/products.json` (1000 products) and inserts into both remote and local `products` collections. Skips if either collection already has data.

## Start the App

```bash
npm run app
```

## Endpoints

### Part I — Products REST API

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/products` | Fetch all products |
| GET | `/products/price-range` | Products priced Rs. 500–1000 |
| GET | `/products/expired` | All expired products |
| GET | `/products/low-stock` | Products with quantity < 50 |
| GET | `/products/firm/:firm` | Products by firm name |
| DELETE | `/products/expired` | Delete expired from both DBs |
| PATCH | `/products/firm/:firm/price` | Update price by firm (body: `{ price }`) |

### Part II — CV Management (Browser)

| URL | Description |
|-----|-------------|
| `http://localhost:3000/resumes` | Home — list all resumes |
| `http://localhost:3000/resumes/addNew` | Form to create a new CV |
| `http://localhost:3000/resumes/:id` | View full CV details |
| `http://localhost:3000/resumes/:id/edit` | Edit a CV |

## Project Structure

```
app.js                  ← entry point (HTTP server)
assets/
  products.json         ← 1000 product records
config/
  db.js                 ← remote + local DB connections
  upload.js             ← multer config
  index.js              ← barrel export
controllers/
  product.js            ← product CRUD logic
  resume.js             ← resume CRUD logic
  index.js              ← barrel export
models/
  product.js            ← Product schema (remote + local)
  resume.js             ← Resume schema (remote + local)
  index.js              ← barrel export
routes/
  product.js            ← product routes
  resume.js             ← resume routes
scripts/
  importProducts.js     ← one-time product import
views/
  home.ejs              ← list all resumes
  createCV.ejs          ← create new CV form
  editCV.ejs            ← edit CV form
  details.ejs           ← full CV details
public/uploads/         ← uploaded images and documents
```
