import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import 'dotenv/config';
import routes from './controllers/index.js';
import globalErrorHandler from './middlewares/GlobalErrorHandling.js';
import corsResolver from './middlewares/CORSResolver.js';

const server = express();
const port = +process.env.PORT || 4000;

// global variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next());
server.use(corsResolver);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('./static'));

// Routes
server.use(routes);

// Root path
server.get('^/$', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'static', 'html', 'index.html'));
});

// 404 error handler for undefined routes
server.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        msg: 'Resource not found',
    });
});

// Global error handling middleware
server.use(globalErrorHandler);

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
