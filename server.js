// server.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { swaggerUi, specs } = require('./swagger');
const productRoutes = require('./Routes/productRoutes');
const categories = require('./Routes/categoryRoutes');
const subcategories = require('./Routes/subcategoryRoutes');
const nestedsubcategories = require('./Routes/nestedsubcategoryRoutes');
const login = require('./Routes/loginRoutes');
const matressRoutes = require('./Routes/matressRoutes');
const bedsRoutes = require('./Routes/bedsRoutes');

const cors = require('cors');
const app = express();
const port = 5000 || process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Define base URL prefix
const baseURL = '/api/v1';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Use base URL prefix for routes
app.use(baseURL + '/products', productRoutes);
app.use(baseURL + '/categories', categories);
app.use(baseURL + '/subcategories', subcategories);
app.use(baseURL + '/nestedsubcategories', nestedsubcategories);
app.use(baseURL + '/auth', login);
app.use(baseURL + '/mattresses', matressRoutes);
app.use(baseURL + '/beds', bedsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
