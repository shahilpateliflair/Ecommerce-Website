const mongoose = require('mongoose');


export interface image{
    filename: String,
    path: String
}

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true }
});

const Image = mongoose.model('ProfileImage', imageSchema);

module.exports = Image;