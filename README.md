# MentorMatch
The Mentorship Matching Platform allows users to connect with mentors or mentees based on shared skills, interests, and career goals. Users can sign up, create profiles, and find potential matches for mentorship opportunities. The platform includes features like secure authentication, profile management, matchmaking, and connection requests.

Deployed URLs

- Frontend: https://mentorshipmatchingplatformfrontend.onrender.com

- Backend: [https://mentorshipmatchingplatform-production.up.railway.app/](https://mentorshipmatchingplatform-production.up.railway.app/api/v1/info)

## Features

### User Authentication:

- Secure sign-up, login, and logout functionality.

- JWT-based authentication.

### Profile Management:

- Create and edit profiles specifying roles (mentor or mentee), skills, interests, and a bio.

### Matchmaking:

- Suggest mentors or mentees based on skills and interests using a matching algorithm.

### Connection Requests:

- Send and receive mentorship requests.

- Manage active mentorship connections.

### Notifications:

- Notify users of new connection requests and updates.

## Technologies Used

### Frontend:

- React.js

- Axios

- React Router DOM

- CSS Framework: Tailwind CSS

### Backend:

- Node.js

- Express.js

- Sequelize (ORM)

### MySQL (Database)

- JWT for authentication

### Deployment:

- Render (Frontend and Backend)

## Setup Instructions

### Prerequisites:

- Node.js (v14 or higher)

- MySQL (configured and running locally or remotely)

- Git

### Backend Setup

1. Clone the repository:
```
git clone https://github.com/Sachins0/MentorshipMatchingPlatform.git
cd server
```

2. Install dependencies:
```
npm install
```

3. Configure environment variables:

- Create a .env file in the root directory with the following:
```
PORT=3000
SALT_ROUNDS=8
JWT_SECRET= <Your_secret>
JWT_EXPIRY= '1h'
DB_HOST=host
DB_USER="root"
DB_PASSWORD=pass
DB_NAME=db_name
```

4. Run migrations and seed data:
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

5. Start the server:
```
npm start
```

- Backend will run at http://localhost:3000.

### Frontend Setup

1. Clone the repository:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Update the API base URL in api.js:
```
const api = axios.create({
  baseURL: "http://localhost:3000",
});
```

4. Start the development server:
```
npm start
```

- Frontend will run at http://localhost:3000.
