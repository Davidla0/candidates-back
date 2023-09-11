const express = require("express");
const dotenv = require('dotenv').config()
const candidateRoutes = require("./src/api/candidate/candidate.route");
const authRoutes = require("./src/api/auth/auth.route");
const cors = require('cors')

const app = express();
app.use(express.json())

const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))

app.use('/api/candidates', candidateRoutes);
app.use('/api/auth', authRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
