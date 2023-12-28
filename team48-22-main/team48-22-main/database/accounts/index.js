const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    })
  }
  const createUser = (body) => {
    return new Promise(function(resolveMe, reject) {
      const { name, email } = body
      pool.query('INSERT INTO users (id, username, tag, email, dateofbirth, accountcreated) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [id, username, tag, email, dateofbirth, accountcreated], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new user has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deleteUser = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`user deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getUsers,
    createUser,
    deleteUser,
  }