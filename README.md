# CarZone API

CarZone is a comprehensive backend application designed for managing a car store. Built with modern technologies like **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**, this project provides robust and scalable APIs to handle car inventory, process orders, and calculate revenue efficiently.

## Features

### Car Management

- **Create**: Add new cars to the inventory.
- **Read**: Retrieve details of all cars or filter by brand, model, or category.
- **Update**: Modify existing car details like price, quantity, or description.
- **Delete**: Remove cars from the inventory.

### Order Management

- **Place Orders**: Customers can order cars with quantity management.
- **Inventory Updates**: Automatically adjusts stock levels upon successful orders.
- **Out-of-Stock Handling**: Prevents ordering cars that are not available.

### Revenue Calculation

- **Total Revenue**: Calculates total revenue from all completed orders using MongoDB aggregation pipelines.

### Error Handling

- Comprehensive error responses with details on validation errors, not-found errors, and more.

---

## Technology Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB, integrated using Mongoose ORM
- **Programming Language**: TypeScript for type-safe development
- **Development Tools**:
  - **ts-node-dev**: Hot reloading for efficient development.
  - **Prettier** and **ESLint**: Ensures code quality and consistency.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- [MongoDB](https://www.mongodb.com/) database set up and running.
- A `.env` file configured for environment variables.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/carzone.git
   cd carzone
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and define the following:

   ```env
   MONGO_URI=your-mongodb-connection-string
   PORT=your-preferred-port
   ```

4. **Run the Application**:
   - **Development Mode**:
     ```bash
     npm run start:dev
     ```
   - **Production Mode**:
     ```bash
     npm run build
     npm run start:prod
     ```

---

## API Documentation

### Endpoints

#### Cars

- **Create a Car**: `POST /api/cars`
- **Retrieve All Cars**: `GET /api/cars`
- **Retrieve Specific Car**: `GET /api/cars/:carId`
- **Update a Car**: `PUT /api/cars/:carId`
- **Delete a Car**: `DELETE /api/cars/:carId`

#### Orders

- **Place an Order**: `POST /api/orders`
- **Calculate Revenue**: `GET /api/orders/revenue`

---

## Development Scripts

- `npm run start:dev`: Starts the server in development mode with live reload.
- `npm run start:prod`: Starts the server in production mode.
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm run lint`: Lints the code for errors.
- `npm run lint:fix`: Automatically fixes linting errors.
- `npm run prettier`: Formats the codebase using Prettier.

---

## Author

Developed by [Md. Maruf Ahamed Prince](https://github.com/engrmarufw). If you have any questions or feedback, feel free to contact me.

## Project Structure

src/
│
├── app/
│ ├── config/
│ │ └── index.ts
│ ├── modules/
│ │ ├── cars/
│ │ │ ├── car.controller.ts
│ │ │ ├── car.model.ts
│ │ │ ├── car.routes.ts
│ │ │ ├── car.schema.ts
│ │ │ └── car.service.ts
│ │ ├── orders/
│ │ ├── order.controller.ts
│ │ ├── order.model.ts
│ │ ├── order.routes.ts
│ │ └── order.service.ts
│
├── app.ts
├── server.ts
│
├── .env
├── .eslintignore
├── .gitignore
├── eslint.config.mjs
├── prettier.config.json
├── package.json
├── package-lock.json
└── README.md
