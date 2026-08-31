import  { NextResponse } from "next/server";
let tasks=[
    { id: 1, title: "Review route handlers", completed: false },
    { id: 2, title: "Implement API endpoints", completed: true },
    { id: 3, title: "Update documentation", completed: true },
];

export async function GET( 
    request: Request,
    {params}: {params: Promise<{id: string}>}){
    const { id } = await params;
    const taskId=Number(id);
    const task=tasks.find((task)=>task.id===taskId);
    if(!task){
        return NextResponse.json({error:"Task not found"}, {status:404});
    }
    return NextResponse.json({data:task}, {status:200});}

export async function PATCH(request: Request, {params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
    const body = await request.json();
    const taskIndex = tasks.findIndex((task) => task.id === Number(id));
    if(taskIndex === -1){
        return NextResponse.json({error:"Task not found"}, {status:404});
    }
    
    if ( typeof body.title==="string" && body.title !== "") {
        tasks[taskIndex].title = body.title;
    }   
    if (typeof body.completed === "boolean") {
        tasks[taskIndex].completed = body.completed;
    }   
    return NextResponse.json({data:tasks[taskIndex]}, {status:200});
}

export async function DELETE(request: Request, {params}: {params: Promise<{id: string}>}) {
    const { id } = await params;
    const taskIndex = tasks.findIndex((task) => task.id === Number(id));
    if(taskIndex === -1){
        return NextResponse.json({error:"Task not found"}, {status:404});
    }
    tasks.splice(taskIndex, 1);
    return NextResponse.json({message:"Task deleted"}, {status:200});
}