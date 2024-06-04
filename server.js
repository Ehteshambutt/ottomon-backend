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
const accessoriesRoutes = require('./Routes/accessoriesRoutes');
const saleRoutes = require('./Routes/saleRoutes');

const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Add Stripe initialization

const app = express();
const port = process.env.PORT || 5000;

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
app.use(baseURL + '/accessories', accessoriesRoutes); // Add this line
app.use(baseURL + '/sales', saleRoutes);

// Payment route
// Payment route
// Payment route
app.post(`${baseURL}/payment`, async (req, res) => {
  const { paymentMethodId, amount, currency, paymentId, billingDetails } = req.body;

  try {
    // Create a PaymentIntent with the provided payment method ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      description: `Payment for Payment ID: ${paymentId}`,
      confirm: true,
      metadata: { paymentId },
      receipt_email: billingDetails.email,
    });

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      paymentIntent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Payment failed: ${error.message}`,
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




