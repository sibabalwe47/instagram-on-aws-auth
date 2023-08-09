// Packages
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";

import startup from "./startup.js";

// Initialise
const app = express();

// Middleware
app.use(bodyParser.json());

// Environment vars
config({ path: "../.env" });

// Routes
import route from "./routes/v1/auth.route.js";

// Paths
app.use(`/api/v1/auth`, route);

app.listen(process.env.PORT, async () => {
  startup.initialise();
});
