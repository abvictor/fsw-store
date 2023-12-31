import { metadata } from "@/app/layout";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const POST = async (req: Request) =>{
    const signature = req.headers.get('stripe-signature')!;

    if(signature){
        return NextResponse.error()
    }
    
    
    const text = await req.text();


    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET_KEY
    )


    if(event.type === 'checkout.session.completed'){        
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ['line_items'],
            }
        )
        const lineItems = sessionWithLineItems.line_items

        console.log(lineItems)
    }

    return  NextResponse.json({ received: true})
}