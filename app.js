import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import assetRouter from './routes/asset.routes.js';
import scopedRouter from './routes/scoped.routes.js';
import coverageRouter from './routes/coverage.routes.js';
import businessRouter from './routes/business.routes.js';
import itRouter from './routes/it.routes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Ensure this path is correct
import controlFamiliesRoutes from './routes/controlFamilyRoutes.js';
import controlRoutes from './routes/controlRoutes.js';
import actionRoutes from './routes/actionRoutes.js';
import assetDetailRouter from './routes/assetDetail.routes.js';
import completionStatusRoutes from './routes/completionStatus.js';
import evidenceRoutes from './routes/evidenceRoutes.js';
import notificationRoutes from './routes/notificationsRoutes.js';
import completionRoutes from './routes/completionRoutes.js';
import companyFormRoutes from './routes/companyFormRoutes.js';
import TaskManager from './models/taskManager.js';
import stepTasks from './routes/stepTasks.js';
import complianceSnapshotRoutes from './routes/complianceSnapshotRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userResponseRoutes from './routes/userResponseRoutes.js';
import productFamilyRoutes from './routes/productFamilyRoutes.js';

// import './scripts/scheduler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://riskindex360.com', // Ensure this matches the frontend URL
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Static file directories
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the routes
app.use('/api/user-responses', userResponseRoutes);
app.use('/api', productFamilyRoutes);
app.use('/api/v1/assets', assetRouter);
app.use('/api/v1/scoped', scopedRouter);
app.use('/api/v1/coverage', coverageRouter);
app.use('/api/v1/business', businessRouter);
app.use('/api/v1/it', itRouter);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/v1/control-families', controlFamiliesRoutes);
app.use('/api/v1/controls', controlRoutes);
app.use('/api/v1/actions', actionRoutes);
app.use('/api/v1/assetDetails', assetDetailRouter);
app.use('/api/v1/completion-status', completionStatusRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/task', TaskManager);
app.use('/api/notifications', notificationRoutes);
app.use('/api/v1', stepTasks);
app.use('/api/company-form', companyFormRoutes);
app.use('/api/v1/compliance-snapshot', complianceSnapshotRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/v1', completionRoutes);

// Serve React static files from build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Download route for files
app.get('/:filename', async (req, res) => {
  const { filename } = req.params;
  const filepath = path.join('uploads', filename);
  return res.download(filepath);
});

// Catch-all handler for frontend routes (React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

export { app };

// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import path from 'path'; // Needed for resolving file paths
// import { fileURLToPath } from 'url';

// // Import routes

// import assetRouter from './routes/asset.routes.js';
// import scopedRouter from './routes/scoped.routes.js';
// import coverageRouter from './routes/coverage.routes.js';
// import businessRouter from './routes/business.routes.js';
// import itRouter from './routes/it.routes.js';
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js'; // Ensure this path is correct
// import controlFamiliesRoutes from './routes/controlFamilyRoutes.js'; // Import control families routes
// import controlRoutes from './routes/controlRoutes.js'; // Import control routes
// import actionRoutes from './routes/actionRoutes.js'; // Import action routes
// import assetDetailRouter from './routes/assetDetail.routes.js';
// import completionStatusRoutes from './routes/completionStatus.js'; // Import completion status routes
// import evidenceRoutes from './routes/evidenceRoutes.js';

// import notificationRoutes from './routes/notificationsRoutes.js';

// import completionRoutes from './routes/completionRoutes.js';

// import companyFormRoutes from './routes/companyFormRoutes.js';

// import TaskManager from './models/taskManager.js';

// import stepTasks from './routes/stepTasks.js';

// import complianceSnapshotRoutes from './routes/complianceSnapshotRoutes.js'; // Adjust the path as necessary

// import messageRoutes from './routes/messageRoutes.js'; // Adjust the path as necessary
// import userResponseRoutes from './routes/userResponseRoutes.js'; // Import user response routes
// import productFamilyRoutes from './routes/productFamilyRoutes.js'; // Adjust the import path as necessary

// import './scripts/scheduler.js'; // Import the scheduler

// import path from 'path';
// import fs from 'fs';



// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

// // Enable CORS for the frontend domain
// app.use(cors({
//   origin: 'http://riskindex360.com', // Allow frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//   credentials: true, // Allow credentials (cookies, etc.)
// }));

// app.use(express.json({ limit: '16kb' }));
// app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// app.use(express.static('public'));
// app.use(express.static('uploads'));
// app.use(cookieParser());

// // Use the routes
// app.use('/api/user-responses', userResponseRoutes);
// app.use('/api', productFamilyRoutes); // Mount the product family routes at /api

// // routes declaration
// app.use('/api/v1/assets', assetRouter);
// app.use('/api/v1/scoped', scopedRouter);
// app.use('/api/v1/coverage', coverageRouter);
// app.use('/api/v1/business', businessRouter);
// app.use('/api/v1/it', itRouter);
// app.use('/api/auth', authRoutes);

// app.use('/api/users', userRoutes);

// app.use('/api/v1/control-families', controlFamiliesRoutes); // Add this line to handle control families
// app.use('/api/v1/controls', controlRoutes); // Add control routes
// app.use('/api/v1/actions', actionRoutes); // Add action routes
// app.use('/api/v1/assetDetails', assetDetailRouter);

// app.use('/api/v1/completion-status', completionStatusRoutes); // Add completion status routes

// app.use('/api/evidence', evidenceRoutes);
// app.use('/api/task', TaskManager);

// app.use('/api/notifications', notificationRoutes);

// app.use('/api/v1', stepTasks);

// // Use the company form routes
// app.use('/api/company-form', companyFormRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Use compliance snapshot routes
// app.use('/api/v1/compliance-snapshot', complianceSnapshotRoutes);

// // Use the message routes
// app.use('/api/messages', messageRoutes);

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// // Catch-all handler for any requests not matched above
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

// app.get('/:filename', async (req, res) => {
//   const { filename } = req.params;
//   const filepath = path.join('uploads', filename);
//   return res.download(filepath);
//   // return res.send(filepath)
// }),
//   app.use('/api/v1', completionRoutes);


  
// // Global error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     message: err.message || 'Internal Server Error',
//     error: process.env.NODE_ENV === 'development' ? err : {},
//   });
// });

// export { app };
