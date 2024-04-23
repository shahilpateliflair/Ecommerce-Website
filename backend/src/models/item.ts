import { Schema,model } from "mongoose";

export interface item{
    // _id:string
    name:string
    description:string;
    price:number;
    MRP:number;
    off:number;
    tag:string[];
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
    deliverTime:string[];
}

export const itemSchema = new Schema<item>({
    // _id:{type:String,required:true},
    // here we dont changed
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    MRP:{type:Number,required:true},
    off:{type:Number,required:true},
    stars:{type:Number,required:true},
    tag:{type:[String]},
    favorite:{type:Boolean,default:false},
    imageUrl:{type:String,required:true},
    origins:{type:[String],required:true},
    deliverTime:{type:[String],required:true}
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
})

export  const itemModel = model<item>('item',itemSchema)



// import { Schema,model } from "mongoose";

// export interface item{
//     // id:string
//     name:string
//     description:string;
//     price:number;
//     MRP:number;
//     off:number;
//     tag:string[];
//     favorite:boolean;
//     stars:number;
//     imageUrl:string;
//     origins:string[];
//     deliverTime:string[];
// }

// export const itemSchema = new Schema<item>({
//     // id:{type:String,required:true},
//     name:{type:String,required:true},
//     description:{type:String,required:true},
//     price:{type:Number,required:true},
//     MRP:{type:Number,required:true},
//     off:{type:Number,required:true},
//     stars:{type:Number,required:true},
//     tag:{type:[String]},
//     favorite:{type:Boolean,default:false},
//     imageUrl:{type:String,required:true},
//     origins:{type:[String],required:true},
//     deliverTime:{type:[String],required:true}
// },{
//     toJSON:{
//         virtuals:true
//     },
//     toObject:{
//         virtuals:true
//     },
//     timestamps:true
// })

// export  const itemModel = model<item>('item',itemSchema)

// export interface CartItem {
//     itm: any; // Assuming itm can have any type, you can specify a more specific type if needed
//     quantity: number;
//     price: number;
//   }

// import { Schema,model } from "mongoose";

// export interface item{
//     // id:string
//     _id: Schema.Types.ObjectId;
//     name:string
//     description:string;
//     price:number;
//     MRP:number;
//     off:number;
//     tag:string[];
//     favorite:boolean;
//     stars:number;
//     imageUrl:string;
//     origins:string[];
//     deliverTime:string[];
// }

// export const itemSchema = new Schema<item>({
//     _id:{type:String,required:true},
//     name:{type:String,required:true},
//     description:{type:String,required:true},
//     price:{type:Number,required:true},
//     MRP:{type:Number,required:true},
//     off:{type:Number,required:true},
//     stars:{type:Number,required:true},
//     tag:{type:[String]},
//     favorite:{type:Boolean,default:false},
//     imageUrl:{type:String,required:true},
//     origins:{type:[String],required:true},
//     deliverTime:{type:[String],required:true}
// },{
//     toJSON:{
//         virtuals:true
//     },
//     toObject:{
//         virtuals:true
//     },
//     timestamps:true
// })

// export  const itemModel = model<item>('item',itemSchema)


