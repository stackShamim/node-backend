// ======================= NODE.JS BACKEND =======================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WebSocket = require('ws');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://testuser:testpassword@cluster0.je99zig.mongodb.net/ecomt');

// Models
const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    userType: { type: String, enum: ['customer', 'seller', 'distributor'] },
    businessName: String,
    businessAddress: String,
    createdAt: { type: Date, default: Date.now },
  })
);

const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: Number,
    imageUrl: String,
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isNewProduct: { type: Boolean, default: true },
    hasFreeSample: { type: Boolean, default: false },
    isCustomizable: { type: Boolean, default: false },
    category: String,
    stock: Number,
    createdAt: { type: Date, default: Date.now },
  })
);

const FreeSample = mongoose.model(
  'FreeSample',
  new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
  })
);

const VideoChat = mongoose.model(
  'VideoChat',
  new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    status: {
      type: String,
      enum: ['requested', 'accepted', 'completed'],
      default: 'requested',
    },
    offer: Object,
    answer: Object,
    iceCandidates: [Object],
    createdAt: { type: Date, default: Date.now },
  })
);

// WebSocket Server for Video Chat
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// API Endpoints

// Auth
app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({
      userId: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().populate('vendorId', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/seller/products', async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.query.userId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/distributor/products', async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gte: 100 } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Free Samples
app.post('/api/free-samples', async (req, res) => {
  try {
    const freeSample = new FreeSample(req.body);
    await freeSample.save();
    res.status(201).json(freeSample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Video Chat
app.post('/api/video-chat/offer', async (req, res) => {
  try {
    let videoChat = await VideoChat.findOne({
      sellerId: req.body.sellerId,
      userId: req.body.userId,
      status: 'requested',
    });

    if (!videoChat) {
      videoChat = new VideoChat(req.body);
    } else {
      videoChat.offer = req.body.offer;
    }

    await videoChat.save();
    res.status(201).json(videoChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/video-chat/answer', async (req, res) => {
  try {
    const videoChat = await VideoChat.findByIdAndUpdate(
      req.body.chatId,
      { answer: req.body.answer, status: 'accepted' },
      { new: true }
    );
    res.json(videoChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/video-chat/ice-candidate', async (req, res) => {
  try {
    const videoChat = await VideoChat.findByIdAndUpdate(
      req.body.chatId,
      { $push: { iceCandidates: req.body.candidate } },
      { new: true }
    );
    res.json(videoChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/video-chat/requests', async (req, res) => {
  try {
    const requests = await VideoChat.find({
      sellerId: req.query.sellerId,
      status: 'requested',
    })
      .populate('userId', 'name')
      .populate('productId', 'name');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ======================= END OF NODE.JS BACKEND =======================//
