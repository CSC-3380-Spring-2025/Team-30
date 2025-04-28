SSL Website Revamp (Team 30)
============================

Members
-------

- Project Manager: [Andrew Dang](https://github.com/theavgandrew)
- Communications Lead: [Ella Vu](https://github.com/iwasella)
- Git Master: [Cameron Shortt](https://github.com/cameronshortt)
- Design Lead: [Jenah Mansour](https://github.com/Jenahh)
- Quality Assurance Tester: [Abdul Chattha](https://github.com/beastgamer69420)

About
-----

The SSL website had issues.  We're fixing those issues.

Local Development Setup
------------------

Step 0: Ensure you're on a compatible platform

- The VM backend has only been tested on the following platforms:
  - x86_64-linux-gnu
  - x86_64-linux-musl
- If you are not on one of these platforms, we cannot guarantee
  the VM backend will work as intended

Step 1: Clone the Repository

```
$ git clone https://github.com/CSC-3380-Spring-2025/Team-30
$ cd Team-30
```

Step 2: Install Dependencies

Please ensure you have a functioning nodejs installation.
Then install frontend dependencies as usual.

```
$ npm install
```

Read the vm-backend README carefully for the VM setup,
and ensure you have a functioning PostgreSQL installation.

Step 3: Set Up PostgreSQL Database

- Create an initial database: `$ psql postgres`
  - At the resulting prompt: `CREATE DATABASE club_db;`

Step 4: Create a .env File

Create a .env file in the root of the project:
```
# .env
DATABASE_URL="postgresql://postgres@localhost:5432/club_db"
```
You can replace postgres with the PostgreSQL user you created
during installation.

Step 5: Set Up Prisma

Prisma is our ORM for managing the database schema.
1. Generate Prisma Client: `$ npx prisma generate`
2. Apply Migrations (Create Tables in the DB): `$ npx prisma migrate dev --name init`
   - This will read the schema in prisma/schema.prisma and apply it to your local DB.
3. (Optional) View and Edit Data in a GUI: `$ npx prisma studio`
   - This should not be necessary unless something has gone horribly wrong

Step 6: Start the Dev Server

```
$ npm run dev
```

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


