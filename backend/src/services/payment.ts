// const config = require('./config/stripe');

// const stripe = require('stripe')(config.SECRET_KEYS);


// async function createSession(params: { priceId: any },callback: any) {
//     const session = await stripe.checkout.session.create({
//         payment_method_types: ['card'],
//       line_items:[{price:params.priceId,price1:params.priceId,price2:params.priceId,quantity:1}],
//       mode:'payment',
//       success_url:config.SUCCESS_URL,
//       failure_url:config.CANCEL_URL,
//     })

//     callback({id:session.id});
// }

// module.exports={
//     createSession
// }


// >>>>>>>>>>>> this is write above lines of code