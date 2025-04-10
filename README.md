🚀 SSL Website Revamp (Team 30)
============================

👥 Members
-------

- Project Manager: [Andrew Dang](https://github.com/theavgandrew)
- Communications Lead: [Ella Vu](https://github.com/iwasella)
- Git Master: [Cameron Shortt](https://github.com/cameronshortt)
- Design Lead: [Jenah Mansour](https://github.com/Jenahh)
- Quality Assurance Tester: [Abdul Chattha](https://github.com/beastgamer69420)

About
-----

The SSL website had issues.  We're fixing those issues.

🛠️ Local Development Setup
------------------
📦 Step 1: Clone the Repository
```git clone https://github.com/your-team/ssl-club-website.git```
```cd ssl-club-website```

🧱 Step 2: Install Dependencies
Make sure you have Node.js (v18+) and npm installed.
```npm install```

🐘 Step 3: Set Up PostgreSQL Database
You need PostgreSQL installed locally.

✅ If you don’t have it:
Mac: brew install postgresql
Ubuntu: sudo apt install postgresql
Windows: Download installer

Once installed, create a local database:
- ```psql postgres```
- ```CREATE DATABASE club_db;```

🗂️ Step 4: Create a .env File
Create a .env file in the root of the project:
```DATABASE_URL="postgresql://postgres@localhost:5432/club_db"```
You can replace postgres with your actual PostgreSQL username.

🔧 Step 5: Set Up Prisma
Prisma is our ORM for managing the database schema.
1. Generate Prisma Client
    ```npx prisma generate```
2. Apply Migrations (Create Tables in the DB)
    ```npx prisma migrate dev --name init```
     This will read the schema in prisma/schema.prisma and apply it to your local DB.
3. (Optional) View and Edit Data in a GUI
    ```npx prisma studio```

💻 Step 6: Start the Dev Server
    ```npm run dev```

The project should now be running on http://localhost:3000 (or another port if configured differently).

Platforms Tested on
-------------------

- [ ] Android
- [ ] iOS
- [ ] Linux
- [ ] MacOS
- [ ] Windows

Styles Guide
------------

Club Website API Documentation

📚How to Use This
- Each API section below contains:
- The HTTP method (GET, POST, DELETE)
- The endpoint (e.g., /api/events)
- What it does
- What kind of data it sends or receives
- Example requests/responses
You can use these endpoints by calling them with JavaScript’s fetch() or using tools like Postman to test them first.

📅 Events API
1️⃣ Get All Events
Method: GET
Endpoint: /api/events
Description: Returns a list of all upcoming events.

✅ Use this if:
You want to display events on the homepage or an event calendar.

Response Example:
```
[
  { "id": 1, "title": "Club Meeting", "event_date": "2025-04-10" },
  { "id": 2, "title": "Fundraiser", "event_date": "2025-04-20" }
]
```


2️⃣ Create a New Event
Method: POST
Endpoint: /api/events
Description: Allows club officers to create a new event.

✅ Use this if:
You’re building a form for officers to submit events.

Request Body Example:
```
{
  "title": "New Event",
  "event_date": "2025-05-15"
}
```
Response Example:
```
{ "message": "Event created successfully" }
```

3️⃣ Delete an Event
Method: DELETE
Endpoint: /api/events/:id
Description: Deletes an event by ID. Only accessible by officers.

✅ Use this if:
You’re adding a "Delete" button to event cards on the admin dashboard.

Response Example:
```
{ "message": "Event deleted successfully" }
```

🔐 Authentication API
4️⃣ Login (Officers Only)
Method: POST
Endpoint: /api/auth/login
Description: Logs in an officer. You’ll get a JWT token to use in authenticated API calls.

✅ Use this if:
You need to build a login form for officers or protect parts of the site behind login.

Request Body Example:
```
{
  "email": "officer@example.com",
  "password": "securepassword"
}
```

Response Example:
```
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "role": "Officer"
  }
}
```

You’ll need to store this token (e.g., in localStorage) and send it in the Authorization header for protected routes.


