import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stripe, RedirectToCheckoutOptions, } from '@stripe/stripe-js';
import { environment } from 'src/environments/environments';
// import { cartitem } from '../models/cartitem';
import { dynamiccartitem } from '../models/dynamiccartitem';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
stripePromise: Promise<Stripe>

constructor(){
  this.stripePromise = this.loadStripe();
}
private loadStripe():Promise<Stripe>{
  return (window as any).Stripe(environment.stripeKey);
}

async redirectToCheckout(data:any): Promise<void> {
  try {
    const stripe = await this.stripePromise;
    console.log('Stripe instance:', stripe);
    // const model = {
    //   priceId: environment.priceId,
     
    // };
    
    const response = await fetch(environment.apiUrl + '/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        
        totalPrice: data.totalPrice,
        totalQuantity: data.totalQuantity,
        success_url: `${window.location.origin}/payment`,
        cancel_url: `${window.location.origin}/payments`,
       
      })
      
    });

    console.log('Fetch response:', response);

    if (!response.ok) {
      throw new Error(`Failed to create checkout session. Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Checkout session response:', responseData);

    const sessionId = responseData?.sessionId;
    if (!sessionId) {
      throw new Error('Checkout session ID not received');
    }

    const options: RedirectToCheckoutOptions = {
      sessionId: sessionId
    };
    
    const result = await stripe.redirectToCheckout(options);

    if (result.error) {
      throw new Error(`Stripe redirectToCheckout failed: ${result.error.message}`);
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    // Handle error - e.g., display a user-friendly message
     throw error;
  }
}


}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


