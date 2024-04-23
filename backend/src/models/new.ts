import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  filename: string;
  filePath: string;
}

const imageSchema: Schema = new Schema({
  filename: { type: String, required: true },
  filePath: { type: String, required: true }
});

const Image = mongoose.model<IImage>('Image', imageSchema);

export default Image;