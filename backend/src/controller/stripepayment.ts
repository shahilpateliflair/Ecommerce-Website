
            
//             import { NextFunction , Request, Response} from "express";

// const StripeServices = require('../services/payment');

// exports.createPaymentSession = (req: Request, res: Response, next: NextFunction) => {
//     StripeServices.createSession({
//         priceId: req.body.priceId,
//         priceId1: req.body.priceId1,
//         priceId2: req.body.priceId2,
//         success_url: 'http://localhost:4200/payments?session_id={CHECKOUT_SESSION_ID}', // Correct parameter name
//         cancel_url: 'http://localhost:4200/payments' // Correct parameter name
//     }, (response: any) => {
//         return res.status(200).send(response);
//     });
// };

// >>>>>>>>>>>>>>>>>>>>>>> this is above write












// export const createPaymentSession=(req: any,res: any,next: any)=>{
//     StripeServices.createSession({
//         priceId:req.body.priceId
//     },(response: any)=>{
//         return res.status(200).send(response)
//     })
// }


// const StripeServices = require('../services/payment');
// import { Request, Response, NextFunction } from 'express';


// export const createPaymentSession = (req: Request, res: Response, next: NextFunction) => {
    //     StripeServices.createSession({
        //         priceId: req.body.priceId
        //     }, (response: any) => {
            //         return res.status(200).send(response);
            //     });
            // };