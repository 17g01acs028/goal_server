import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import weekRoutes from "./routes/week.js";
import goalRoutes from "./routes/goals.js"
import categoryRoutes from "./routes/category.js"


import { register } from "./controllers/auth.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// /* ROUTES WITH FILES */
app.post("/auth/register", register);

// /* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/weeks", weekRoutes);
app.use("/goals", goalRoutes);
app.use("/categories", categoryRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
console.log(PORT)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    //User.insertMany(users);
  })
  .catch((error) => console.log(`${error} did not connect`));


  export default app;