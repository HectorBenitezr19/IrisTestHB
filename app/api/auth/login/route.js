import bcrypt from 'bcrypt';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
  }

  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
  }

  return new Response(JSON.stringify({ todos: user.todos }), { status: 200 });
}
