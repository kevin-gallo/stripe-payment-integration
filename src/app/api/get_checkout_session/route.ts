import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-07-30.basil',
});

export async function GET(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get('session_id');

    if(!sessionId) {
        return NextResponse.json({
            error: 'Session ID is required',
            status: 400
        });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'customer_details']
        });

        return NextResponse.json(session);

    } catch (error) {
        return NextResponse.json({
            error: 'Failed to retrieve session',
            status: 500
        });
    }
}