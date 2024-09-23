import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();


export async function GET(request:NextRequest){
const data = await prisma.category.findMany({});
return NextResponse.json(data);
}