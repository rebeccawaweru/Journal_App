# Personal Journaling App Documentation

## Table of Contents
1. [Backend Service Setup and Run Instructions](#backend-service-setup-and-run-instructions)
2. [Mobile App Build and Run Instructions](#mobile-app-build-and-run-instructions)
3. [API Documentation](#api-documentation)


## Backend Service Setup and Run Instructions<
Prerequisites
Node.js (>= 14.x.x)
npm (>= 6.x.x)
PostgreSQL

Step-by-Step Instructions
1. Clone Respository
git clone https://github.com/rebeccawaweru/Journal_App.git
cd JournalApp/server

2. Install dependencies
npm install

3. Configure Environment Variables
Create a .env file in the root of the server directory.
Add the following environment variables:
DB_NAME=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=your_database_host_name
PORT=your_database_port_number
JWT_SECRET=your_jwt_secret_key

4. Run Database Migrations
npx sequelize-cli db:migrate

5. Start the Backend Server
npm start

6. Verify Server is Running
On your console, you should observe the following result:
`Server is running on port 5000`


## Mobile App Build and Run Instructions<
Prerequisites
Node.js (>= 14.x.x)
npm (>= 6.x.x)
Expo CLI (install using npm install -g expo-cli)
Android Studio or Xcode (for emulators) or a physical device with Expo Go App

Step-by-Step Instructions
1. Clone Respository
git clone https://github.com/rebeccawaweru/Journal_App.git
cd JournalApp/mobile

2. Install dependencies
npm install

3. Start the Expo Development Server
npm start

4. Run the App
For Android: Press a in the terminal to open the Android emulator.
For iOS: Press i in the terminal to open the iOS simulator.
Alternatively, scan the QR code in the Expo Go app on your physical device.


## API Documentation<
## BASE URL
http://localhost:5001

## Endpoints
1. User Registration
URL: /auth/register
Method: POST
Body Parameters:
{
  "username": "string",
  "password": "string"
}
Responses:
`201 Created`
{
  "success": true,
  "user": {
    "id": "integer",
    "username": "string"
    "password": "string"
  }
}
`400 Bad Request`:
{
  "error": "string"
}


2. User Login
URL: /auth/login
Method: POST
Body Parameters:
{
  "username": "string",
  "password": "string"
}
Responses:
`200 OK`
{
  "token": "string"
}
`401 Unauthorized`
{
  "error": "Invalid Credentials"
}
`400 Bad Request`:
{
  "error": "string"
}

3. Create Journal Entry
URL: /journals
Method: POST
Headers: Authorization: Bearer <token>
Body Parameters:
{
  "title": "string",
  "category": "string"
  "content": "string",
  "date": Date
}
Responses:
`201 Created`
{
  "success": true,
  "journal": {
  "id": "integer",
  "title": "string",
  "category": "string"
  "content": "string",
  "date": Date,
  "userId":"integer"
  }
}
`400 Bad Request`:
{
  "error": "string"
}

4. Get User Journal Entries
URL: /journals
Method: GET
Headers: Authorization: Bearer <token>
Responses:
`200 OK`
{
  "journals": [{
  "id": "integer",
  "title": "string",
  "category": "string"
  "content": "string",
  "date": Date,
  "userId":"integer"
  }]
}
`400 Bad Request`:
{
  "error": "string"
}

5. Update Journal Entry
URL: /journals/:id
Method: PUT
Headers: Authorization: Bearer <token>
URL Parameters: id - ID of the journal entry
Body Parameters:
{
  "title": "string",
  "category": "string"
  "content": "string",
  "date": Date
}
Responses:
`200 OK`
{
  "success": true,
}
`404 Not Found` : {
    "error": "Journal entry not found"
}
`400 Bad Request`:
{
  "error": "string"
}

5. Delete Journal Entry
URL: /journals/:id
Method: DELETE
Headers: Authorization: Bearer <token>
URL Parameters: id - ID of the journal entry
Responses:
`200 OK`
{
  "success": true,
  "message":"Journal entry deleted"
}
`404 Not Found` : {
    "error": "Journal entry not found"
}
`400 Bad Request`:
{
  "error": "string"
}







