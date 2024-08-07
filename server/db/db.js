const mongoose = require("mongoose");

const DB_URL = "mongodb+srv://faizanvhora999:VSzPF3GlG6cHG4dG@cluster0.hmvaigp.mongodb.net/faizandatabase";


// mongoose.connect(DB_URL);

const connectDb = async() => {
    try {
        await mongoose.connect(DB_URL);
        console.log("database connection successfully..!!");
    } catch (error) {
        console.log("database connection failed..!!");
        process.exit(0);
    }
}

module.exports = connectDb;