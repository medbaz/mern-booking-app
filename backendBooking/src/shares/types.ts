
export interface hotelFormType  {
    _id:string;
    userId:string;
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    adultCount:number;
    childCount:number;
    facilities:string[];
    pricePerNight:number;
    starRating:number; 
    imageUrls:string[];
    lastUpdated:Date;
}

export interface searchHotelsType {
    data : hotelFormType[];
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}


// const hotelSchema = new mongoose.Schema({

//     userId:{
//         type:String,
//         required:true
//     },
//     name:{
//         type:String,
//         required:true
//     },
//     city:{
//         type:String,
//         required:true
//     },
//     country:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     type:{
//         type:String,
//         required:true
//     },
//     adultCount:{
//         type:Number,
//         required:true
//     }
//     ,
//     childCount:{
//         type:Number,
//         required:true
//     }
//     ,
//     facilities:[{
//         type:String,
//         required:true
//     }]
//     ,
//     pricePerNight:{
//         type:Number,
//         required:true
//     } ,
//     starRating:{
//         type:Number,
//         required:true ,
//         min:1 ,
//         max:5
//     } ,
//     imageUrls:[{
//         type:String,
//         required:true
//     }],
//     lastUpdated:{
//         type:Date,
//         required:true
//     }


// }
// )


// const Hotel = mongoose.model('Hotel',hotelSchema)
// export default Hotel
