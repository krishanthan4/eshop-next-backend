import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { get } from "https";
import { connect } from "http2";
import { select } from "@material-tailwind/react";
interface RequestData {
  title: string;
  description: string;
  userEmail: string;
}

export async function POST(request: NextRequest) {
  const requestData: RequestData = await request.json();
  if (!requestData.title && !requestData.description && !requestData.userEmail)
    return NextResponse.json(
      { error: "provide atleast title" },
      { status: 400 }
    );

  const data = await prisma.product.findMany({
    where: {
      OR: [
        { title: { startsWith: requestData.title } },
        { description: { startsWith: requestData.description } },
        { userEmail: { startsWith: requestData.userEmail } },
      ],
    },
    orderBy: {
      datetimeAdded: "asc",
    },
    select: {
      userEmail: false,
      productImg: true,
      title: true,
      price:true,
    },
    take:10,
  });

  if (data) return NextResponse.json(data, { status: 200 });

  return NextResponse.json({ error: "something went wrong " }, { status: 400 });
}

export async function GET(){
  const data = await prisma.product.findMany({ select:{
      productImg:true,
      title:true,
      price:true
    }});
  return NextResponse.json(data,{status:200});
}