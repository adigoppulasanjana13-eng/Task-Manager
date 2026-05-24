async function loadTasks() {
  const res = await fetch('/api/tasks')
  const tasks = await res.json()

  const list = document.getElementById('taskList')
  list.innerHTML = ''

  // update stats
  const total = tasks.length
  const done = tasks.filter(t => t.completed).length
  const pending = total - done
  document.getElementById('totalCount').textContent = total
  document.getElementById('doneCount').textContent = done
  document.getElementById('pendingCount').textContent = pending

  if (tasks.length === 0) {
    list.innerHTML = '<p class="empty">No tasks yet. Add one above!</p>'
    return
  }

  tasks.forEach(task => {
    const li = document.createElement('li')
    li.className = task.completed ? 'completed' : ''
    li.innerHTML = `
      <span class="task-title">${task.title}</span>
      <div class="actions">
        <button class="btn-complete" onclick="toggleTask(${task.id})">
          ${task.completed ? 'Undo' : 'Done'}
        </button>
        <button class="btn-delete" onclick="deleteTask(${task.id})">
          Delete
        </button>
      </div>
    `
    list.appendChild(li)
  })
}

async function addTask() {
  const input = document.getElementById('taskInput')
  const title = input.value.trim()
  if (!title) {
    alert('Please enter a task!')
    return
  }
  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  input.value = ''
  loadTasks()
}

async function toggleTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'PATCH' })
  loadTasks()
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
  loadTasks()
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask()
})

loadTasks()
