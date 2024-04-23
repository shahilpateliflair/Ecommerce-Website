// it is just example
// app.post('/upload', upload.array('images', 5), async (req: Request, res: Response) => {
//   try {
//     const files = req.files as Express.Multer.File[];
//     const uploadedImages = [];
//     for (let i = 0; i < files.length; i++) {
//       const imageFile = files[i];
//       const imageName = req.body.names[i] || imageFile.originalname; // Use provided name or original name
//       const imagePath = path.join(__dirname, '..', 'uploads', imageName);
//       fs.writeFileSync(imagePath, fs.readFileSync(imageFile.path)); // Save file with custom name
//       const newImage = await Image.create({
//         filename: imageName,
//         filePath: imagePath
//       });
//       uploadedImages.push(newImage);
//     }
//     res.status(201).json(uploadedImages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// for image upload

// app.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     const { name, description, price, MRP, off, origins, deliverTime ,tag,category} = req.body;
//     const imageUrl = req.file.path;
//     console.log('Image URL:', imageUrl)
    
//     const product = new products({
//       name,
//       description,
//       price,
//       MRP,
//       off,
//       origins,
//       deliverTime,
//       imageUrl,
//       tag,
//       category
//     });
//     await product.save();
//     res.status(201).json({ message: 'Product created successfully', product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// it's very important

// app.get(
//   "/item",
//   AsynceHandler(async (req, res) => {
//     const items = await itemModel.find();
//     res.send(items);
//   })
// );

// app.get(
//   "/item/:searchTerm",
//   AsynceHandler(async (req, res) => {
//     const searchRegex = new RegExp(req.params.searchTerm, "i");
//     const items = await itemModel.find({ name: { $regex: searchRegex } });
//     res.send(items);
//   })
// );

// app.get(
//   "/tag",
//   AsynceHandler(async (req, res) => {
//     const tags = await itemModel
//       .aggregate([
//         {
//           $unwind: "$tag",
//         },
//         {
//           $group: {
//             _id: "$tag",
//             count: { $sum: 1 },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             name: "$_id",
//             count: "$count",
//           },
//         },
//       ])
//       .sort({ count: -1 });

//     const all = {
//       name: "All",
//       count: await itemModel.countDocuments(),
//     };
//     tags.unshift(all);
//     res.send(tags);
//   })
// );

// app.get(
//   "/tag/:tagname",
//   AsynceHandler(async (req, res) => {
//     const item = await itemModel.find({ tag: req.params.tagname });

//     res.send(item);
//   })
// );

// app.get(
//   "/items/:itemId",
//   AsynceHandler(async (req, res) => {
//     const item = await itemModel.findById(req.params.itemId);
//     res.send(item);
//   })
// );