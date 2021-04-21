import mongoose from "mongoose";
import { DB_URL } from "./../config"

class MongoDB {
    init(options = { useNewUrlParser: true }) {
        // @ts-ignore
        mongoose.connect(DB_URL, options);

        mongoose.connection.on('open', () => {
            console.log('MongoDB: Connected');
        });

        mongoose.connection.on('error', (err) => {
            console.log('MongoDB: Error', err);
        });
    }

}

export default new MongoDB;