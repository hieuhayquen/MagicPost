const mongoose = require("mongoose");

const uri = process.env.DB_URI;

module.exports = async () => {
    try{
        const conn = await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Error: ${error.message}`)
            process.exit(1)
    }
}
