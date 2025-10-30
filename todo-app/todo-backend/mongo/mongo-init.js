db.createUser({
  user: 'teppo',
  pwd: 'salainen',
  roles: [
    {
      role: 'dbOwner',
      db: 'todo_db',
    },
  ],
})

db.createCollection('todos')

db.todos.insert({ text: 'Write code', done: true })
db.todos.insert({ text: 'Learn about containers', done: false })
