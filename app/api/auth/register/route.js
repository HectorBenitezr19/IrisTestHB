import bcrypt from 'bcrypt';
import User from '../../../../models/User'
import { connectToDatabase } from '../../../../lib/mongodb';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, todos: [] });
  await newUser.save();

  return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 200 });
}
