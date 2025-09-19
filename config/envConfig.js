process.loadEnvFile()

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI
const MY_SECRET_KEY = process.env.MY_SECRET_KEY

module.exports= {
    PORT,
    DB_URI,
    MY_SECRET_KEY
}