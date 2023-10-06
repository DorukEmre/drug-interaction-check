import express from 'express'
const app = express()

import mainRoutes from './routes/main.routes.js'

const port = process.env.PORT || 5000

// Define a route for the root URL
app.use('/', mainRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`)
})
