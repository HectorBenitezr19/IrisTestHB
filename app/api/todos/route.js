import User from "../../../models/User";
import { connectToDatabase } from "../../../lib/mongodb";

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const date = url.searchParams.get("date");

  if (!email || !date) {
    return new Response(
      JSON.stringify({ message: "Email and date are required" }),
      { status: 400 }
    );
  }

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const todosByDate = user.todos.get(date) || [];
  return new Response(JSON.stringify({ todos: todosByDate }), { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.text();
    const { email, todos } = JSON.parse(body);

    if (!email || !todos) {
      return new Response(
        JSON.stringify({ message: "Email or tasks are missing" }),
        { status: 400 }
      );
    }

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Merge new todos with existing todos
    for (const [date, tasks] of Object.entries(todos)) {
      user.todos.set(date, tasks);
    }
    await user.save();

    return new Response(JSON.stringify({ message: "Todos updated" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ message: "Error processing request" }),
      { status: 500 }
    );
  }
}
