// import mongoose, { Schema } from "mongoose";

import mongoose, { Schema } from "mongoose";



export interface IProductReview extends Document {
    productId: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
  createdAt:Date;
  userProfile: mongoose.Types.ObjectId;
  
}

const ProductReviewSchema: Schema = new Schema<IProductReview>({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    rating: Number,
    userProfile: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const ProductReview = mongoose.model<IProductReview>('ProductReview', ProductReviewSchema);

export default ProductReview;