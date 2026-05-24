const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000
const DATA_FILE = './data/tasks.json'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// helper functions
function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    if (!data || data.trim() === '') return []
    return JSON.parse(data)
  } catch (err) {
    console.log('Error reading tasks:', err.message)
    return []
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2))
}

// render page
app.get('/', (req, res) => {
  res.render('index')
})

// REST API routes

// GET - fetch all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks()
  res.json(tasks)
})

// POST - add new task
app.post('/api/tasks', (req, res) => {
  const tasks = readTasks()
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  }
  tasks.push(newTask)
  writeTasks(tasks)
  res.status(201).json(newTask)
})

// PATCH - toggle complete
app.patch('/api/tasks/:id', (req, res) => {
  const tasks = readTasks()
  const task = tasks.find(t => t.id === parseInt(req.params.id))
  if (!task) return res.status(404).json({ message: 'Task not found' })
  task.completed = !task.completed
  writeTasks(tasks)
  res.json(task)
})

// DELETE - delete task
app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readTasks()
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id))
  writeTasks(tasks)
  res.json({ message: 'Task deleted successfully' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: err.message })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})