
export interface product {
  forEach(arg0: (productItem: any) => void): unknown;
  
 
  _id: string; // MongoDB ObjectId
  name: string;
  description: string;
  price: number;
  MRP: number;
  off: number;
  origins: string[];
  deliverTime: string[];
  imageUrl: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image:string[];
  // images: File[] | null;
productId?:string
  category:string;
  tag:string;
  size:string;
  color:string;
}

