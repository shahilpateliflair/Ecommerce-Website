import { item } from "./app/models/item";
import { tags } from "./app/models/tags";

export const sample_products: item[]=[
   { id:'1',
    name:'shirt',
    description:'this is blue shirt',
    price:12,
    MRP:15,
    off:3,
    tag:['clothes','cotten','jeans'],
    favorite:false,
    stars:5,
    imageUrl:'assets/shirt.jpg',
    origins:['gujarat'],
    deliverTime:['1']
   },
   { id:'2',
    name:'iphone',
    description:'this is iphone mobile',
    price:1400,
    MRP:1450,
    off:50,
    tag:['Mobiles','shirts','jeans'],
    favorite:false,
    stars:4,
    imageUrl:'assets/iphone.jpg',
    origins:['gujarat'],
    deliverTime:['1']
   },
   { id:'3',
    name:'jeans',
    description:'this is blue jeans',
    price:20,
    MRP:25,
    off:5,
    tag:['clothes','color','jeans'],
    favorite:true,
    stars:1,
    imageUrl:'assets/jeans.jpg',
    origins:['new york'],
    deliverTime:['5']
   },
   { id:'4',
    name:'watch',
    description:'this is simple  watch',
    price:799,
    MRP:899,
    off:100,
    tag:['watch','apple','digital'],
    favorite:false,
    stars:3,
    imageUrl:'assets/watch.jpg',
    origins:['china'],
    deliverTime:['10']
   },
   { id:'5',
    name:'headphones',
    description:'this is blue headphones',
    price:160,
    MRP:175,
    off:15,
    tag:['headphones','sony','nokia'],
    favorite:true,
    stars:4,
    imageUrl:'assets/images.jpeg',
    origins:['kutch'],
    deliverTime:['2']
   },
   { id:'6',
    name:'watch',
    description:'this is digital watch',
    price:1225,
    MRP:1400,
    off:175,
    tag:['watch','apple','digital'],
    favorite:false,
    stars:3,
    imageUrl:'assets/digital watch.jpg',
    origins:['london'],
    deliverTime:['7']
   }
]

 

export const sample_tags: tags[]=
[
   
   {name:'all', count:2},
   {name:'watches', count:2},
   {name:'headphones', count:1},
   {name:'Digital Watch', count:1},
   {name:'Mobiles', count:2},
   {name:'jeans', count:3},
   {name:'clothes', count:1},
   {name:'winter', count:1},
]
