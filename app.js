const express = require("express");
const userRoute = require("./route/user.route")
const authRoute = require("./route/auth.route")
const bookRoute = require("./route/book.route")
const mongoose = require("mongoose")
const {PORT, DB_URI} = require("./config/envConfig")
const app = express()
console.log(PORT,DB_URI)

app.use(express.json())

mongoose.connect(DB_URI).then(() => console.log("mongodb://localhost:27017/"));

app.use("/auth",authRoute)
app.use("/users",userRoute)
app.use("/book",bookRoute)

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})