
# CarZone API

CarZone is a backend application built using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**. This project provides a RESTful API for managing a car store, including functionalities for car management, order processing, and revenue calculation.

## Features

- **CRUD Operations for Cars**:
  - Create, Read, Update, and Delete car information.
  - Filter cars by brand, model, or category.

- **Order Management**:
  - Place orders for cars.
  - Manage inventory by automatically updating stock levels based on orders.

- **Revenue Calculation**:
  - Calculate total revenue from all orders using MongoDB aggregation.

- **Validation and Error Handling**:
  - Mongoose schema validation.
  - Comprehensive error messages for invalid inputs and actions.

---

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Language**: TypeScript
- **Development Tools**:
  - **ts-node-dev** for live reloading during development.
  - **Prettier** and **ESLint** for code formatting and linting.

---

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- [MongoDB](https://www.mongodb.com/) database set up and running.
- A `.env` file for environment variables (refer to the `.env.example` provided in the project).

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/carzone.git
   cd carzone
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and define the following variables:
   ```
   MONGO_URI=your-mongodb-connection-string
   PORT=your-port-number
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

5. **API Documentation**:
   Access the API endpoints using tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

---

## API Endpoints

### Cars

1. **Create a Car**: `POST /api/cars`
2. **Get All Cars**: `GET /api/cars`
3. **Get a Specific Car**: `GET /api/cars/:carId`
4. **Update a Car**: `PUT /api/cars/:carId`
5. **Delete a Car**: `DELETE /api/cars/:carId`

### Orders

1. **Place an Order**: `POST /api/orders`
2. **Calculate Revenue**: `GET /api/orders/revenue`

---

## Scripts

- `npm run start:dev`: Starts the server in development mode with live reload.
- `npm run start:prod`: Starts the server in production mode.
- `npm run build`: Compiles the TypeScript code into JavaScript.
- `npm run lint`: Lints the codebase.
- `npm run lint:fix`: Fixes linting issues.
- `npm run prettier`: Formats the codebase using Prettier.

---

## Development Tools Used

- **Prettier**: Code formatting.
- **ESLint**: Code linting.
- **ts-node-dev**: Hot reloading during development.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your fork and submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

Developed by [Your Name](https://github.com/yourusername).

