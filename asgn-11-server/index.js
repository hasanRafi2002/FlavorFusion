const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const admin = require('firebase-admin');

// Load environment variables from .env file
dotenv.config();

// Set up Firebase Admin SDK with environment variables
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};
connectDB();

// Initialize Express app
const app = express();

const allowedOrigins = [
  'http://localhost:5173', 
  'https://rafi-a11.netlify.app', 
  'http://yourserverdomain.com',
  'https://asgn-11-server.vercel.app'  // Add your Vercel domain
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log('Request Origin:', origin); // Debugging
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  console.log('Token from client:', token);

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      id: decodedToken.user_id,
      name: decodedToken.name || 'Unknown',
      email: decodedToken.email,
    };
    console.log('Authenticated user:', req.user); // Debugging: log authenticated user info
    next();
  } catch (err) {
    console.error('Token verification failed:', err.code || err.message);
    if (err.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Token expired. Please refresh your token.' });
    }
    return res.status(403).json({ message: 'Invalid token. Authentication failed.' });
  }
};

// Schemas and Models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  photoURL: { type: String, default: null },
  role: { type: String, default: 'user' },
}, { timestamps: true });

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 3, maxlength: 50 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, maxlength: 500 },
  category: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 },
  image: { type: String, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  origin: { type: String, trim: true },
  purchaseCount: { type: Number, default: 0 },
  addedBy: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    photoURL: { type: String, trim: true },
  },
}, { timestamps: true });

const purchaseSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  foodName: { type: String, required: true },
  foodImage: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  buyerPhotoURL: { type: String, required: true },
  location: { type: String, required: true },
  buyingDate: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Food = mongoose.model('Food', foodSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

const GalleryPhoto = mongoose.model('GalleryPhoto', new mongoose.Schema({
  image: { type: String, required: true },
  user: { type: String, required: true },
  feedback: { type: String, required: true },
}, { timestamps: true }));

// Validation Schemas
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const createFoodSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().max(500),
  category: Joi.string().min(3).max(30).required(),
  image: Joi.string().uri(),
  quantity: Joi.number().positive().required(),
  origin: Joi.string().optional(),
  addedBy: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    photoURL: Joi.string().uri().optional(),
  }).required(),
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, name: newUser.name, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    }).status(201).json({ token, user: newUser });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, photoURL: user.photoURL, role: user.role },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Profile route
app.get('/api/auth/profile', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Food routes
app.post('/api/foods', authMiddleware, async (req, res) => {
  const { error } = createFoodSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newFood = new Food({
      ...req.body,
      addedBy: { name: req.user.name, email: req.user.email, photoURL: req.body.addedBy.photoURL }
    });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    console.error('Error creating food:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    console.error('Error fetching foods:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/foods/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (err) {
    console.error('Error fetching food:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/foods/:id', authMiddleware, async (req, res) => {
  const { error } = createFoodSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFood) return res.status(404).json({ message: 'Food not found' });
    res.status(200).json(updatedFood);
  } catch (err) {
    console.error('Error updating food:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/foods/:id', authMiddleware, async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: 'Food not found' });
    res.status(200).json({ message: 'Food deleted' });
  } catch (err) {
    console.error('Error deleting food:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Purchase routes
app.post('/api/purchases', authMiddleware, async (req, res) => {
  const { foodId, foodName, foodImage, price, quantity, buyerName, buyerEmail, buyerPhotoURL, location } = req.body;

  try {
    const newPurchase = new Purchase({ foodId, foodName, foodImage, price, quantity, buyerName, buyerEmail, buyerPhotoURL, location });
    await newPurchase.save();

    // Update the purchase count and quantity of the food item
    await Food.findByIdAndUpdate(foodId, { $inc: { purchaseCount: quantity, quantity: -quantity } });

    res.status(201).json({ message: 'Purchase successful', purchase: newPurchase });
  } catch (err) {
    console.error('Error processing purchase:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/purchases', authMiddleware, async (req, res) => {
  const email = req.user.email; // Use email from the authenticated user

  try {
    const purchases = await Purchase.find({ buyerEmail: email });
    res.status(200).json(purchases);
  } catch (err) {
    console.error('Error fetching purchases:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/purchases/:id', authMiddleware, async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });

    // Increment the quantity of the food item
    await Food.findByIdAndUpdate(purchase.foodId, { $inc: { quantity: purchase.quantity } });

    await Purchase.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Purchase deleted and food quantity updated' });
  } catch (err) {
    console.error('Error deleting purchase:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Gallery routes
app.post('/api/gallery', authMiddleware, async (req, res) => {
  const { image, user, feedback } = req.body;
  if (!image || !user || !feedback) {
    return res.status(400).json({ message: 'Image, user, and feedback are required' });
  }

  try {
    const newPhoto = new GalleryPhoto({ image, user, feedback });
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    console.error('Error posting photo:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const photos = await GalleryPhoto.find();
    res.status(200).json(photos);
  } catch (err) {
    console.error('Error fetching photos:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/gallery/:id', authMiddleware, async (req, res) => {
  try {
    const deletedPhoto = await GalleryPhoto.findByIdAndDelete(req.params.id);
    if (!deletedPhoto) return res.status(404).json({ message: 'Photo not found' });
    res.status(200).json({ message: 'Photo deleted' });
  } catch (err) {
    console.error('Error deleting photo:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});