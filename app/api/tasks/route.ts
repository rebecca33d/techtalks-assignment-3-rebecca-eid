import {NextResponse} from "next/server";

let tasks=[
    { id: 1, title: "Review route handlers", completed: false },
    { id: 2, title: "Implement API endpoints", completed: true },
    { id: 3, title: "Update documentation", completed: true },
];

export async function GET() {
    return NextResponse.json({data: tasks}, {status: 200});
}

export async function POST(request: Request) {
    const body = await request.json();
    if (!body ||typeof body.title !== "string" || body.title==="") {
        return NextResponse.json({error: "Title is required"}, {status: 400});
    }
    const newTask = {
        id: tasks.length + 1,
        title: body.title,
        completed: false,
    };
    tasks.push(newTask);
    return NextResponse.json({data: newTask}, {status: 201});
}