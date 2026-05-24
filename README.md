# Task Manager App

A full stack task manager built with Node.js, Express and EJS.

## Tech Stack
- Backend: Node.js, Express.js, REST API
- Frontend: HTML, CSS, JavaScript
- Template Engine: EJS
- Storage: JSON file (fs module)

## Features
- Add tasks
- Mark tasks as complete / undo
- Delete tasks
- Live stats (Total, Done, Pending)
- Data persists after page refresh

## How to Run

1. Clone the repository
   git clone https://github.com/adigoppulasanjana13-eng/Task-Manager.git

2. Install dependencies
   npm install

3. Start the server
   npm run dev

4. Open browser
   http://localhost:3000

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Add new task |
| PATCH | /api/tasks/:id | Toggle complete |
| DELETE | /api/tasks/:id | Delete task |

## Author
Sanjana Adigoppula
