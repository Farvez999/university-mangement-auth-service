import mongoose from "mongoose";
import app from './app'
import config from "./config/index";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Database Connect Successfully")

        app.listen(config.port, () => {
            console.log(`Apllication listening on port ${config.port}`)
        })
    } catch (error) {
        console.log("Failed to connect databse")
    }
}

main();