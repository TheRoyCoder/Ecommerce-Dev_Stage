import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRouters from './routes/productRouters.js'
import cors from 'cors';
import connectDb from "./config/db.js";

// rest obj.
const app = express();

// middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRouters);


//test api
app.get('/', (req, res) => {
    res.send(
        "<h1>Helo</h1>"
    )
});


// configure env
dotenv.config();

connectDb()

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
