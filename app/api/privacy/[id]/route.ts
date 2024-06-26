import { connectToDatabase } from "@/app/api/helpers/server-helpers";
import prisma from "@/prisma";
import { ParamsType } from "@/types/paramTypes";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  // GET a privacy by id
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("id");;

  try {
    const getUniquePrivacy = await prisma.privacy.findUnique({
      where: {
        id: url || "",
      },
    });
    return NextResponse.json({ getUniquePrivacy }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const PUT = async (req: Request) => {
  // UPDATE a privacy by id
  await connectToDatabase();
  let { key, title, description } = await req.json();
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("id");;
  if (!key || !title || !description)
    return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
  try {
    const updatePrivacy = await prisma.privacy.update({
      where: {
        id: url || "",
      },
      data: {
        key, title, description
      },
    });
    return NextResponse.json({ updatePrivacy }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  // DELETE a privacy by id
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("id");;
  try {
    const deletePrivacy = await prisma.privacy.delete({
      where: {
        id: url || "",
      },
    });
    return NextResponse.json({ deletePrivacy }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
