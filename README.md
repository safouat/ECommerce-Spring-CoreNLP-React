# E-Commerce Platform with Advanced Features

## Project Goal
This project aims to create a full-fledged e-commerce platform with advanced features like **Seller Review Analysis** to enhance decision-making. The platform provides:

- **Insights into the most discussed topics** in product reviews.
- **Sentiment distribution analysis** using CoreNLP from Stanford.

Additionally, we have developed a **REST API** that supports fundamental CRUD operations of an e-commerce platform, with user validation at every step.

---
## Modules

1. **Login/Logout**
2. **Seller**
3. **Customer**
4. **Product**
5. **Cart**
6. **Order**
7. **Review Analysis**

## Class Diagram and ER Diagram:
![classfinal](https://github.com/user-attachments/assets/3134bc55-fe98-419a-8bb7-e991a6253b2d)
![er](https://github.com/user-attachments/assets/835d7451-e182-499b-91a1-067ec153d3e9)


## Front-End Interface (React.js)

### Screenshots
![Screenshot from 2025-01-16 18-35-53](https://github.com/user-attachments/assets/a3d88b46-0100-4cc3-b667-eef8f44041f5)
![Screenshot from 2025-01-16 18-35-53](https://github.com/user-attachments/assets/50852c86-49da-4d45-9358-2fadcae6d7e2)
![Screenshot from 2025-01-16 18-36-04](https://github.com/user-attachments/assets/13597570-c59f-4d09-8d18-2fefdf3c4819)
![Screenshot from 2025-01-16 18-36-07](https://github.com/user-attachments/assets/cb4e32bf-6954-4f20-9913-ace86cb4978f)
![Screenshot from 2025-01-16 18-36-11](https://github.com/user-attachments/assets/9d0ac7ad-0055-47c5-8c81-07cb44b9ab67)
![Screenshot from 2025-01-16 18-36-26](https://github.com/user-attachments/assets/b1d59cd4-0b45-4839-b3ea-84661856ce37)
![Screenshot from 2025-01-16 18-36-28](https://github.com/user-attachments/assets/d2ff3ac6-fae4-4ae0-962b-be6c40f984d2)
![Screenshot from 2025-01-16 18-37-07](https://github.com/user-attachments/assets/88f53924-c770-4327-be2b-8bc2a0776ccc)
![Screenshot from 2025-01-16 18-37-18](https://github.com/user-attachments/assets/0aaeec06-15cd-4207-be6a-bf45e2e0d975)
![Screenshot from 2025-01-16 18-37-50](https://github.com/user-attachments/assets/26bf8e38-c3a8-4482-a796-9bdbc0de6347)
![Screenshot from 2025-01-16 18-38-07](https://github.com/user-attachments/assets/1bec9d85-2a47-42db-affe-2aa149c9fdb3)
![Screenshot from 2025-01-16 18-38-36](https://github.com/user-attachments/assets/13eb4dfd-4927-462d-8c21-a4b53b592035)
![Screenshot from 2025-01-16 18-38-55](https://github.com/user-attachments/assets/1b94cff1-a224-4ce4-a497-843357687da5)
![Screenshot from 2025-01-16 18-38-39](https://github.com/user-attachments/assets/e8957b0e-d437-4d80-a570-e94fbb1cfa18)

---

## Back-End (Spring Boot)

### Tech Stack
- **Java**
- **Spring Framework**
- **Spring Boot**
- **Spring Data JPA**
- **Hibernate**
- **MySQL**
- **CoreNLP (Stanford)**


### Features
#### Seller Features
- Administrator role for managing the application.
- Add/Update/Delete products with valid session tokens.
- Access customer details, order history, and review insights.

#### Customer Features
- Register and log in to get a valid session token.
- Browse products, add to the cart, and place orders.
- Access order history, cart, and other features when logged in.

#### Review Analysis Module
Analyze customer reviews using CoreNLP. This module:
- Extracts the most discussed topics.
- Displays sentiment distribution (positive, negative, neutral).
- API Endpoint:  
  ```http
  GET /analysis/{productId}

## API Endpoints

### Root Endpoint
- **Base URL:** `https://localhost:8009/`
- **Swagger UI:** [API Documentation](http://localhost:8009/swagger-ui/index.html#/)

### Login & Logout Module
- `POST /register/customer` - Register a new customer
- `POST /login/customer` - Login customer
- `POST /logout/customer` - Logout customer
- `POST /register/seller` - Register a new seller
- `POST /login/seller` - Login seller
- `POST /logout/seller` - Logout seller

### Customer Module
- `GET /customer/current` - Get logged-in customer details
- `PUT /customer` - Update customer details
- `DELETE /customer` - Delete customer account

### Seller Module
- `GET /seller/{sellerid}` - Get seller by ID
- `POST /addseller` - Add new seller
- `PUT /seller` - Update seller details
- `DELETE /seller/{sellerid}` - Delete seller by ID

### Product Module
- `GET /product/{id}` - Get product by ID
- `POST /products` - Add new product
- `DELETE /product/{id}` - Delete product by ID

### Cart Module
- `GET /cart` - Get cart items
- `POST /cart/add` - Add item to cart
- `DELETE /cart/clear` - Clear cart

### Order Module
- `GET /orders` - Get all orders
- `POST /order/place` - Place a new order
- `DELETE /orders/{id}` - Cancel an order

---
## How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/ecommerce-platform.git
```
2. Install Dependencies
Frontend
```bash
cd frontend-directory
npm install
```

Backend

Configure the application.properties file for MySQL connection:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```
3. Build and Run the Server

    Build the backend:
```bash
mvn clean install

cd target

java -jar ecommerce-platform-<version>.jar
```
4. Start the Frontend

Navigate to the frontend directory and start the React application:
```bash
npm install
npm start
```
## Project Created By:

- **Safouat El Yassini**
- **Mohammed Amyn El Boujadaini**

Contributions are welcome!
