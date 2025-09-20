const express = require("express");
const userRoute = require("./route/user.route")
const authRoute = require("./route/auth.route")
const bookRoute = require("./route/book.route")
const {limiter} = require("./middleware/rateLimiters")
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose")

const {PORT, DB_URI} = require("./config/envConfig")
const app = express()

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));




app.use(limiter)

app.use(express.json())

mongoose.connect(DB_URI).then(() => console.log("DB Connected"));

app.use("/auth",authRoute)
app.use("/users",userRoute)
app.use("/book",bookRoute)

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})