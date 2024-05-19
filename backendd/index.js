const main = require('./db')
const express = require('express')
main()
const app = express()
const port = 3000

app.use(express.json())
//available routes
app.use('/api/auth', require('./routes/auth'))
// app.use('/api/auth', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})