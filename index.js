const express = require("express")
const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT} http://localhost:5000 ...`);
})