import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(request: Request) {
    const { text } = await request.json();

    if (!text || !text.trim()) {
        return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
        .from("messages")
        .insert([{ text }])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: data }); 
}