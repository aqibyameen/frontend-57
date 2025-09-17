import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();


  const combined = formData.get("combinedPreview") as File | null;
  const assets = formData.getAll("assets") as File[];
  const price = formData.get("price") as string;

  if (!combined) {
    return NextResponse.json({ error: "Missing images" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "designs");
  await mkdir(uploadDir, { recursive: true });

  const saveFile = async (file: File, name: string) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, `${name}-${Date.now()}.png`);
    await writeFile(filePath, buffer);
    return "/designs/" + path.basename(filePath);
  };

  const combinedUrl = await saveFile(combined, "combined");

  const assetUrls: string[] = [];
  for (let i = 0; i < assets.length; i++) {
    const url = await saveFile(assets[i], `asset-${i + 1}`);
    assetUrls.push(url);
  }

  return NextResponse.json({
    success: true,
    price,

    combinedUrl,
    assetUrls,
  });
}
