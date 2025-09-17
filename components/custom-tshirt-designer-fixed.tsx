"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { Rnd } from "react-rnd";
import * as htmlToImage from "html-to-image";
import { useRouter } from "next/navigation";

type DesignElement = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  side: "front" | "back";
};

export default function CustomTshirtDesigner() {
  const [designElements, setDesignElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [currentSide, setCurrentSide] = useState<"front" | "back">("front");
  const [uploadedAssets, setUploadedAssets] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Base price + 200 per asset
  const totalPrice = 1000 + uploadedAssets.length * 200;

  // Add new element from uploaded file
  const addElement = (src: string) => {
    const newElement: DesignElement = {
      id: Date.now().toString(),
      src,
      x: 50,
      y: 50,
      width: 120,
      height: 120,
      side: currentSide,
    };
    setDesignElements((prev) => [...prev, newElement]);
  };

  // Handle file upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadedAssets((prev) => [...prev, reader.result]);
        addElement(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Delete element
  const deleteElement = (id: string) => {
    setDesignElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedElement === id) setSelectedElement(null);
  };

  // Capture one side
  const captureSide = async (side: "front" | "back") => {
    setCurrentSide(side);
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!canvasRef.current) return null;

    const deleteButtons = canvasRef.current.querySelectorAll(".delete-btn");
    const selectedBorders = canvasRef.current.querySelectorAll(".selected-border");
    deleteButtons.forEach((btn) => ((btn as HTMLElement).style.display = "none"));
    selectedBorders.forEach((el) => ((el as HTMLElement).style.border = "none"));

    const dataUrl = await htmlToImage.toPng(canvasRef.current, {
      cacheBust: true,
      backgroundColor: "#ffffff",
      pixelRatio: 3,
    });

    deleteButtons.forEach((btn) => ((btn as HTMLElement).style.display = ""));
    selectedBorders.forEach(
      (el) => ((el as HTMLElement).style.border = "2px solid #60a5fa")
    );

    return dataUrl;
  };

  // Merge front + back
  const mergeFrontBack = async (frontUrl: string, backUrl: string) => {
    return new Promise<string>((resolve) => {
      const frontImg = new Image();
      const backImg = new Image();
      let loaded = 0;

      const checkLoaded = () => {
        loaded++;
        if (loaded === 2) {
          const width = frontImg.width + backImg.width;
          const height = Math.max(frontImg.height, backImg.height);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(frontImg, 0, 0);
          ctx.drawImage(backImg, frontImg.width, 0);
          resolve(canvas.toDataURL("image/png"));
        }
      };

      frontImg.onload = checkLoaded;
      backImg.onload = checkLoaded;
      frontImg.src = frontUrl;
      backImg.src = backUrl;
    });
  };

  // Convert data URL → Blob
  const dataUrlToBlob = (dataUrl: string) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  };

  // Add to cart
  const addToCart = async () => {
    const frontDataUrl = await captureSide("front");
    const backDataUrl = await captureSide("back");
    if (!frontDataUrl || !backDataUrl) return;

    const combinedPreview = await mergeFrontBack(frontDataUrl, backDataUrl);

    const formData = new FormData();
    formData.append("front", await (await fetch(frontDataUrl)).blob(), "front.png");
    formData.append("back", await (await fetch(backDataUrl)).blob(), "back.png");
    formData.append(
      "combinedPreview",
      await (await fetch(combinedPreview)).blob(),
      "combined.png"
    );

    uploadedAssets.forEach((asset, i) => {
      formData.append("assets", dataUrlToBlob(asset), `asset-${i + 1}.png`);
    });

    formData.append("price", totalPrice.toString());

    await fetch("/api/save-design", {
      method: "POST",
      body: formData,
    });

    router.push("/cart");
  };

  const currentSideElements = designElements.filter((el) => el.side === currentSide);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Side toggle */}
      <div className="flex justify-center gap-4">
        <Button
          variant={currentSide === "front" ? "default" : "outline"}
          onClick={() => setCurrentSide("front")}
        >
          Front
        </Button>
        <Button
          variant={currentSide === "back" ? "default" : "outline"}
          onClick={() => setCurrentSide("back")}
        >
          Back
        </Button>
      </div>

      {/* T-shirt Canvas */}
      <div
        ref={canvasRef}
        className="relative w-[300px] h-[400px] bg-white flex items-center justify-center"
      >
        <img
          src={currentSide === "front" ? "/front-black-mockup.png" : "/back-black-mockup.png"}
          alt="T-shirt"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {currentSideElements.map((element) => (
          <Rnd
            key={element.id}
            size={{ width: element.width, height: element.height }}
            position={{ x: element.x, y: element.y }}
            onDragStop={(e, d) => {
              setDesignElements((els) =>
                els.map((el) => (el.id === element.id ? { ...el, x: d.x, y: d.y } : el))
              );
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setDesignElements((els) =>
                els.map((el) =>
                  el.id === element.id
                    ? {
                        ...el,
                        width: parseInt(ref.style.width),
                        height: parseInt(ref.style.height),
                        ...position,
                      }
                    : el
                )
              );
            }}
            bounds="parent"
          >
            <div
              className={`relative w-full h-full ${
                selectedElement === element.id ? "selected-border" : ""
              }`}
              onClick={() => setSelectedElement(element.id)}
            >
              <img src={element.src} alt="Design" className="w-full h-full object-contain" />
              {selectedElement === element.id && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-6 -right-6 delete-btn"
                  onClick={() => deleteElement(element.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Rnd>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4 items-center">
        <input type="file" accept="image/*" onChange={handleUpload} />
        <Button onClick={addToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
        <span className="font-bold">Total: Rs {totalPrice}</span>
      </div>
    </div>
  );
}
