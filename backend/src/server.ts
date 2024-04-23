import express from "express";
import bcrypt from "bcryptjs";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import jwt from "jsonwebtoken";
import cors from "cors";
import Profile from '../src/models/userProfile';
import dotenv from "dotenv";
import nodemailer from 'nodemailer'
import { EmailService } from './routes/mail'
import otpGenerator from 'otp-generator';
dotenv.config();

const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51OvdziSEeNnK6Y0xYneiw4ShDPm360BR1KHCuU7PC2Z8TxV4eMpWJfcHsZClVwg1Uwwf8MhYf9qxonZGVxd9Iz3q00cUZ6zLa7');

const mongoose = require("mongoose");

import { product1, products1 } from "./models/image";
import Image from '../src/models/new';
import AsynceHandler from "express-async-handler";
import { itemModel } from "./models/item";
import { user, userModel } from "./models/user";
import { orderStatusEnum } from "./constants/order_status";
import { ordersModel } from "./models/orders";
import { Request, Response, NextFunction } from 'express';
import { reviewModel } from "./models/review";
import { item } from "./models/item";
import { product, products} from "./models/product";

import { MenModel } from "./models/men";
import { AnyArray } from "mongoose";
import userProfile from "../src/models/userProfile";

import ProductReview from "../src/models/productReview";

const app = express();
app.use(express.json());


const JWT_SECRET = "my_secret_key";

interface AuthenticatedRequest extends Request {
  user?: any;
}


// mongoose.connect("mongodb://localhost:27017/E-commerce");
const uri="mongodb+srv://ecommerce1:0POnMk9RVqmKRQYb@ecommerce.mgtuunv.mongodb.net/"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });




app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
      // origin: ["https://e-commerce-app-one-chi.vercel.app"],
  })
);

// >>>>
// item
// >>>

// >>>>>>>>>>
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id,email: user.email }, JWT_SECRET, { expiresIn: "10h" });
    console.log("Generated Token:", token);
   
    res.json({ token ,user,email: user.email,name: user.name ,address: user.address });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const emailService = new EmailService();
function validatePassword(req, res, next) {
  const { password } = req.body;
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  if (!regex.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.' });
  }

  next();
}
app.post(
  "/register",validatePassword,
  AsynceHandler( async (req, res) => {
    const { name, email, password, address } = req.body;
    const users = await userModel.findOne({ email });
    if (users) {
      res.status(400).send("user is already register,please try to login");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser: user = {
      // id: '',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false,
      headers: undefined
    };
    const dbUser = await userModel.create(newUser)
    res.send(generateTokenResponse(dbUser))
  })
);
app.get("/register",(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await userModel.find({}, { password: 0 }); 
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}));



const generateTokenResponse = (users: any) => {
  const token = jwt.sign(
    {
      id:users.id,
      email: users.email,
      isAdmin: users.isAdmin,
    },
   JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  users.token = token;
  return users;
};

// >>>>>>>>>>>>>>>>>
// Multer upload configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadimage/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/avif'|| file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5 
  },
  fileFilter: fileFilter
});


app.post('/add', upload.fields([
  { name: 'imageUrl', maxCount: 1 },
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), async (req: Request, res: Response) => {
  try {
    const { name, description, tag, price, off, MRP, origins, category } = req.body;
    const { imageUrl,image4,image1, image2, image3 } = req.files as { [fieldname: string]: Express.Multer.File[] };
    const product = new products({
    // const newProduct: product = new products({
      name,
      description,
      price: Number(price),
      MRP: Number(MRP),
      off: Number(off),
      tag,
      origins,
      category,
      imageUrl: imageUrl[0].filename,
      image1: image1[0].filename,
      image2: image2[0].filename,
      image3: image3[0].filename,
      image4: image4[0].filename,
    });

    await product.save();

    res.status(201).json({ message: 'Product added successfully', product: product });
  } catch (err) {
    console.error('Failed to add product:', err);
    res.status(500).json({ message: 'Failed to add product' });
  }
});





app.use('/uploadimage', express.static('uploadimage'));
app.get('/add', async (req, res) => {

  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query = { category };
    }
    const product = await products.find(query);
    res.json(product);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete Product API
app.delete('/add/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await products.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/add/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await products.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/add/:id', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const { name, description, price, MRP, off, origins, deliverTime, imageUrl ,tag} = req.body;

    const updatedFields: any = {};
    // if (imageUrl) updatedFields.imageUrl = imageUrl;
    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;
    if (price) updatedFields.price = price;
    if (MRP) updatedFields.MRP = MRP;
    if (tag) updatedFields.tag = tag;
    if (off) updatedFields.off = off;
    if (origins) updatedFields.origins = origins;
    if (deliverTime) updatedFields.deliverTime = deliverTime;
    if (req.file) {
      updatedFields.imageUrl = req.file.path;
    }
   

    const updatedProduct = await products.findByIdAndUpdate(productId, updatedFields, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/electronics', async (req, res) => {
  try {
    const electronicsProducts = await products.find({ category: 'electronics' });
    res.json(electronicsProducts);
  } catch (error) {
    console.error('Error fetching electronics products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get men's products
app.get('/men', async (req, res) => {
  try {
    const mensProducts = await products.find({ category: 'men' });
    res.json(mensProducts);
  } catch (error) {
    console.error('Error fetching men\'s products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get women's products
app.get('/women', async (req, res) => {
  try {
    const womensProducts = await products.find({ category: 'women' });
    res.json(womensProducts);
  } catch (error) {
    console.error('Error fetching women\'s products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/search', async (req, res) => {
  const searchTerm = req.query.name;
 
    try {
      if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
      }
      const product = await products.find({ name: { $regex: searchTerm, $options: 'i' }})
      res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/tagsByCategories', async (req, res) => {
  try {
    const tagsByCategories = await products.aggregate([
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$category',
          tags: { $addToSet: '$tags' }
        }
      }
    ]);

    res.json(tagsByCategories);
  } catch (error) {
    console.error('Error fetching tags by categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// >>>


// >>>>>>>>>
function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Invalid token format.' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}


app.post('/profile', upload.single('image'),  authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {

   
    const { name, mobile1,email,address1,address2,country,state,postcode,mobile,age} = req.body;
    
    const imageUrl = req.file.path;
    console.log('Image URL:', imageUrl)
    const product = new Profile({
      name,
      email,
      address1,
      address2,
      age,
      postcode,
      mobile1,
      mobile,
      imageUrl,
      state,
      country,
      user: req.user.userId
      
    
    });
    await product.save();
    res.status(201).json({ message: 'Profile created successfully', product});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/profile', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const userProfiles = await Profile.find({ user: userId });

  
    res.status(200).json(userProfiles);
  } catch (error) {
    console.error('Error retrieving profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/profile/:id', upload.single('image'), authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const profileId = req.params.id;
    const { name, mobile1, email, address1, address2, country, state, postcode, mobile, age } = req.body;

   
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path;
    }

  
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    profile.name = name;
    profile.email = email;
    profile.address1 = address1;
    profile.address2 = address2;
    profile.age = age;
    profile.postcode = postcode;
    profile.mobile1 = mobile1;
    profile.mobile = mobile;
    profile.state = state;
    profile.country = country;
    if (imageUrl) {
      profile.imageUrl = imageUrl;
    }

  
    await profile.save();

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/product-reviews', authenticate, async (req: AuthenticatedRequest, res: Response)=> {
  try{
    const userProfile = await Profile.findOne({ user: req.user.userId });
  const product = new ProductReview({
    productId: req.body.productId,
    rating: req.body.rating,
    comment: req.body.comment,
    user: req.user.userId,
    userProfile: userProfile._id
  
  });
  await product.save();
  res.status(201).json({ message: 'Profile created successfully', product});
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/product/:productId/reviews', async (req, res) => {
  console.log('sdssdsfs',req.params)
  
  try {
    const productId = req.params.productId;
  
    // console.log('prosfssfh',productId);
    const reviews = await ProductReview.find({ productId }).populate('userProfile')
    res.json(reviews);
    console.log('prosfssfhfggf',reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
});
app.get('/profile/:id', async (req, res) => {
  try {
    const profileId = req.params.id; // No need to convert to string
    console.log('Received profile ID:', profileId); 
    const isValidObjectId = mongoose.Types.ObjectId.isValid(profileId);
    if (!isValidObjectId) {
      return res.status(400).json({ error: 'Invalid profile ID' });
    }
    
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.put('/profile/:id', upload.single('image'), async (req: Request, res: Response) => {
//   try {
//     const productId = req.params.id;
//     const { name, description, price, MRP, off, origins, deliverTime, imageUrl ,tag} = req.body;

//     const updatedFields: any = {};
   
//     if (name) updatedFields.name = name;
//     if (description) updatedFields.description = description;
//     if (price) updatedFields.price = price;
//     if (MRP) updatedFields.MRP = MRP;
//     if (tag) updatedFields.tag = tag;
//     if (off) updatedFields.off = off;
//     if (origins) updatedFields.origins = origins;
//     if (deliverTime) updatedFields.deliverTime = deliverTime;
//     if (req.file) {
//       updatedFields.imageUrl = req.file.path;
//     }
   

//     const updatedProduct = await products.findByIdAndUpdate(productId, updatedFields, { new: true });

//     if (!updatedProduct) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.json(updatedProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/create', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name,address,mobile, items, totalPrice,size,color,altername,alteraddress,altermobile ,selectedSize,selectedColor} = req.body;
    const imageUrl = req.body.imageUrl;
    
    const newOrder = new ordersModel({
      name,
      address,
   
      items,
      mobile,
      totalPrice,
      altername,
      imageUrl: imageUrl, 
      alteraddress,
      altermobile,
      selectedSize,
      selectedColor,
      size,
      color,
    
      user: req.user.userId
    });
    console.log(req.body.imageUrl)
    console.log(req.body.items)
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/orders', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    
    const userId = req.user.userId;

   
    const userOrders = await ordersModel.find({ user: userId });

    // Return the orders associated with the user
    res.status(200).json(userOrders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// for admin
app.get('/create',  async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Fetch orders belonging to the authenticated user
    const orders = await ordersModel.find();
const product=await products.find()
    // Send the orders as response
    res.status(200).json({ orders, product });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/review',  async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reviews = await reviewModel.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// for admin

 function logRequest(req: Request, res: Response, next: NextFunction) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}
 function authErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(`[${new Date().toISOString()}] Authentication Error: ${err.message}`);
  res.status(401).json({ error: 'Unauthorized' });
}

app.post('/review',logRequest,authErrorHandler,authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username, email, comments,  } = req.body;

    const review = new reviewModel({
      username,
      // productName,
      email,
      // rating,
      comments,
      // platformExperience,
      user: req.user.userId
    });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error subbmitting review', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// >>>>>>>>>>>. for payment stripe i use this route


app.use(bodyParser.json());

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1406a20ceea7cc",
    pass: "c9d862586adf99"
  }
});
async function sendOrderConfirmationEmail(email, deliverTime, name, items, totalPrice) {
  try {
    let deliveryMessage = "";
    if (deliverTime) {
      deliveryMessage = `We will deliver your order within ${deliverTime} days.`;
    } else {
      deliveryMessage = "We will Deliver your order as soon as possible.\n Please give Your Review For us.It's Very Important For our Success";
    }

    let info = await transport.sendMail({
      from: 'Shahil Patel  <mailtrap@demomailtrap.com>',
      to: email,
      subject: 'Order Confirmation',
      text: `Thank you for your order! Here are your items:\n${items.map(item => `${item.name}: $${item.price}`).join('\n')}\nTotal Price: $${totalPrice}\n\n${deliveryMessage}`,
      html: `<p>Thank you for your order!</p><ul>${items.map(item => `<li>${item.name}: $${item.price}</li>`).join('')}</ul><p>Total Price: $${totalPrice}</p></p>${deliveryMessage}</p>`
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const lineItems = req.body.cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.itm.name,
          description: item.itm.description,
        },
        unit_amount: item.itm.price * 100,  
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/payment`,
      cancel_url: `${req.headers.origin}/payments`,
      metadata: {
        total_price: req.body.totalPrice, 
        total_quantity: req.body.totalQuantity,
        email: req.body.email ,
      },
      customer_email: req.body.email
    });

    try {
      await sendOrderConfirmationEmail(req.body.email, req.body.deliverTime, req.body.name, req.body.cartItems.map(item => ({ name: item.itm.name, price: item.itm.price })), req.body.totalPrice);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    res.json({ sessionId: session.id, totalPrice: req.body.totalPrice, email: req.body.email });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  // });

// console.log(req.body.cartItems,'cartItems')
//   console.log(req.body.totalQuantity,'total quantity')
//   console.log(req.body.totalPrice,'totalPrise')
//   console.log(session.id,'session id');
//   console.log(req.body.email,'email')

//     res.json({ sessionId: session.id, totalPrice: req.body.totalPrice,email:req.body.email});

//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// >>>>>>



// >>>>
 

const port = 42000;
app.listen(port, () => {
  console.log("app is listen on this " + port);
});

 


