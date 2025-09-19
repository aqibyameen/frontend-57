/** @format */

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Products";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });

    const formattedProducts = products.map((p: any) => {
      return {
        ...p.toObject(),
        images: p.images || [],
      };
    });

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    let body: any = {};
    let imageData: string[] = [];

    // check content type
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // 🔹 Handle form-data with file uploads
      const formData = await req.formData();

      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const sizes = (formData.get("sizes") as string)?.split(",") || [];
      const gender = (formData.get("gender") as string)?.split(",") || [];
      const price = Number(formData.get("price"));
      const discountPrice = Number(formData.get("discountPrice") || 0);
      const fabric = formData.get("fabric") as string;
      const category = formData.get("category") as string;
      const images = formData.getAll("images") as File[];

      for (const file of images) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        imageData.push(`data:${file.type};base64,${buffer.toString("base64")}`);
      }

      body = {
        name,
        description,
        sizes,
        gender,
        price,
        discountPrice,
        fabric,
        category,
      };
    } else {
      // 🔹 Handle raw JSON (like Postman raw JSON)
      const json = await req.json();
      body = { ...json };
      imageData = json.images || [];
    }

    const product = await Product.create({
      ...body,
      images: imageData,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
