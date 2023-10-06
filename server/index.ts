import express from 'express'
const app = express()
const port = process.env.PORT || 5000

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`)
})
