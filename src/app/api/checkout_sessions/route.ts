import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-07-30.basil',
});

export async function POST(req: Request) {
    const { cartItems } = await req.json();

    if(!cartItems || cartItems.length === 0) {
        return NextResponse.json({
            error: 'Cart is empty!',
            status: 400
        })
    }

    const line_items = cartItems.map((item: any) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [`${req.headers.get('origin')}${item.image}`],
                description: item.description,
            },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/checkout`,
    })

    return NextResponse.json({ url: session.url });
}