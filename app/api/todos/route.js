import User from '../../../models/User';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(req) {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
        return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ todos: user.todos }), { status: 200 });
}

export async function POST(req) {
    try {
        // Log the raw request body
        const body = await req.text();
        console.log('Raw request body:', body);

        // Parse JSON body
        const { email, todos } = JSON.parse(body);

        console.log('Parsed data:', { email, todos });

        if (!email || !todos) {
            return new Response(JSON.stringify({ message: 'Email or tasks are missing' }), { status: 400 });
        }

        await connectToDatabase();
        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        user.todos = todos;
        await user.save();

        return new Response(JSON.stringify({ message: 'Todos updated' }), { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ message: 'Error processing request' }), { status: 500 });
    }
}

