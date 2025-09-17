"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  RotateCw,
  Upload,
  Trash2,
  Move,
  RotateCcw,
  Download,
  ShoppingCart,
  Palette,
  Shirt,
  Search,
  Image as ImageIcon,
  Type,
  Gamepad2,
  Smile,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  allDesignAssets, 
  getAssetsByCategory, 
  searchAssets, 
  DesignAsset,
  SUPPORTED_FORMATS,
  MAX_FILE_SIZE 
} from "@/lib/design-assets";
import React from "react";

// T-shirt colors and styles
const tshirtColors = [
  { name: "White", value: "#FFFFFF", textColor: "#000000" },
  { name: "Black", value: "#000000", textColor: "#FFFFFF" },
  { name: "Navy", value: "#1e3a8a", textColor: "#FFFFFF" },
  { name: "Red", value: "#dc2626", textColor: "#FFFFFF" },
  { name: "Green", value: "#16a34a", textColor: "#FFFFFF" },
  { name: "Gray", value: "#6b7280", textColor: "#FFFFFF" },
];

const tshirtStyles = [
  { name: "Regular Fit", value: "regular" },
  { name: "Slim Fit", value: "slim" },
  { name: "Oversized", value: "oversized" },
  { name: "V-Neck", value: "vneck" },
];

// Predefined stickers/vectors
const predefinedStickers = [
  { id: 1, name: "Gaming Controller", url: "/stickers/gaming-controller.svg" },
  { id: 2, name: "Anime Character", url: "/stickers/anime-character.svg" },
  { id: 3, name: "Cool Text", url: "/stickers/cool-text.svg" },
  { id: 4, name: "Skull", url: "/stickers/skull.svg" },
  { id: 5, name: "Lightning", url: "/stickers/lightning.svg" },
  { id: 6, name: "Heart", url: "/stickers/heart.svg" },
];

interface DesignElement {
  id: string;
  type: "image" | "sticker";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  side: "front" | "back";
}

// T-shirt SVG components
const TshirtFront = ({ color, style }: { color: string; style: string }) => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    <defs>
      <linearGradient id="frontGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="50%" stopColor={color} />
        <stop offset="100%" stopColor={`${color}dd`} />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Main t-shirt body */}
    <path
      d="M80 120 Q80 80 120 80 L130 80 Q140 60 160 60 L240 60 Q260 60 270 80 L280 80 Q320 80 320 120 L320 140 Q320 150 310 150 L300 150 L300 460 Q300 480 280 480 L120 480 Q100 480 100 460 L100 150 L90 150 Q80 150 80 140 Z"
      fill="url(#frontGradient)"
      stroke={`${color}aa`}
      strokeWidth="1"
      filter="url(#shadow)"
    />

    {/* Neckline */}
    <ellipse
      cx="200"
      cy="85"
      rx="25"
      ry="15"
      fill="none"
      stroke={`${color}88`}
      strokeWidth="2"
    />

    {/* Sleeves */}
    <ellipse
      cx="90"
      cy="135"
      rx="15"
      ry="25"
      fill="url(#frontGradient)"
      stroke={`${color}aa`}
      strokeWidth="1"
    />
    <ellipse
      cx="310"
      cy="135"
      rx="15"
      ry="25"
      fill="url(#frontGradient)"
      stroke={`${color}aa`}
      strokeWidth="1"
    />

    {/* Subtle seam lines */}
    <line
      x1="100"
      y1="150"
      x2="100"
      y2="460"
      stroke={`${color}66`}
      strokeWidth="0.5"
    />
    <line
      x1="300"
      y1="150"
      x2="300"
      y2="460"
      stroke={`${color}66`}
      strokeWidth="0.5"
    />
  </svg>
);

const TshirtBack = ({ color, style }: { color: string; style: string }) => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    <defs>
      <linearGradient id="backGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={`${color}dd`} />
        <stop offset="50%" stopColor={color} />
        <stop offset="100%" stopColor={color} />
      </linearGradient>
      <filter id="backShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="-2" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Main t-shirt body - back view */}
    <path
      d="M80 120 Q80 80 120 80 L130 80 Q140 60 160 60 L240 60 Q260 60 270 80 L280 80 Q320 80 320 120 L320 140 Q320 150 310 150 L300 150 L300 460 Q300 480 280 480 L120 480 Q100 480 100 460 L100 150 L90 150 Q80 150 80 140 Z"
      fill="url(#backGradient)"
      stroke={`${color}aa`}
      strokeWidth="1"
      filter="url(#backShadow)"
    />

    {/* Back neckline - higher and more curved */}
    <path
      d="M175 75 Q200 70 225 75"
      fill="none"
      stroke={`${color}88`}
      strokeWidth="2"
    />

    {/* Sleeves */}
    <ellipse
      cx="90"
      cy="135"
      rx="15"
      ry="25"
      fill="url(#backGradient)"
      stroke={`${color}aa`}
      strokeWidth="1"
    />
    <ellipse
      cx="310"
      cy="135"
      rx="15"
      ry="25"
      fill="url(#backGradient)"
      stroke={`${color}aa`}
      strokeWidth="1"
    />

    {/* Back seam lines */}
    <line
      x1="100"
      y1="150"
      x2="100"
      y2="460"
      stroke={`${color}66`}
      strokeWidth="0.5"
    />
    <line
      x1="300"
      y1="150"
      x2="300"
      y2="460"
      stroke={`${color}66`}
      strokeWidth="0.5"
    />
    <line
      x1="200"
      y1="80"
      x2="200"
      y2="460"
      stroke={`${color}44`}
      strokeWidth="0.5"
    />
  </svg>
);

export function CustomTshirtDesigner() {
  const [selectedColor, setSelectedColor] = useState(tshirtColors[0]);
  const [selectedStyle, setSelectedStyle] = useState(tshirtStyles[0]);
  const [currentSide, setCurrentSide] = useState<"front" | "back">("front");
  const [designElements, setDesignElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DesignAsset['category'] | 'all'>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Add design asset
  const addAsset = (asset: DesignAsset) => {
    const newElement: DesignElement = {
      id: `asset-${Date.now()}`,
      type: "sticker",
      src: asset.url,
      x: 50,
      y: 50,
      width: asset.category === 'text' ? 120 : 80,
      height: asset.category === 'text' ? 40 : 80,
      rotation: 0,
      side: currentSide,
    };
    setDesignElements([...designElements, newElement]);
  };

  // Add predefined sticker (legacy support)
  const addSticker = (sticker: (typeof predefinedStickers)[0]) => {
    const newElement: DesignElement = {
      id: `sticker-${Date.now()}`,
      type: "sticker",
      src: sticker.url,
      x: 50,
      y: 50,
      width: 80,
      height: 80,
      rotation: 0,
      side: currentSide,
    };
    setDesignElements([...designElements, newElement]);
  };

  // Get filtered assets
  const getFilteredAssets = () => {
    let assets = selectedCategory === 'all' ? allDesignAssets : getAssetsByCategory(selectedCategory);
    
    if (searchQuery.trim()) {
      assets = searchAssets(searchQuery);
    }
    
    return assets;
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newElement: DesignElement = {
          id: `upload-${Date.now()}`,
          type: "image",
          src: e.target?.result as string,
          x: 50,
          y: 50,
          width: 120,
          height: 120,
          rotation: 0,
          side: currentSide,
        };
        setDesignElements([...designElements, newElement]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update element properties
  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setDesignElements(elements =>
      elements.map(el => el.id === id ? { ...el, ...updates } : el)
    );
  };

  // Delete element
  const deleteElement = (id: string) => {
    setDesignElements(elements => elements.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  // Mouse handlers for dragging
  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedElement(elementId);
    setIsDragging(true);
    
    const element = designElements.find(el => el.id === elementId);
    if (element && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y,
      });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && selectedElement && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = Math.max(0, Math.min(210 - 50, e.clientX - rect.left - dragOffset.x));
      const newY = Math.max(0, Math.min(280 - 50, e.clientY - rect.top - dragOffset.y));
      
      updateElement(selectedElement, { x: newX, y: newY });
    }
  }, [isDragging, selectedElement, dragOffset, updateElement]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners for mouse events
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
        setDesignElements([...designElements, newElement]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update element properties
  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setDesignElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  // Delete element
  const deleteElement = (id: string) => {
    setDesignElements((elements) => elements.filter((el) => el.id !== id));
    setSelectedElement(null);
  };

  // Mouse handlers for dragging
  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    setSelectedElement(elementId);
    setIsDragging(true);

    const element = designElements.find((el) => el.id === elementId);
    if (element) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left - element.x,
          y: e.clientY - rect.top - element.y,
        });
      }
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && selectedElement && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const newX = e.clientX - rect.left - dragOffset.x;
        const newY = e.clientY - rect.top - dragOffset.y;

        updateElement(selectedElement, { x: newX, y: newY });
      }
    },
    [isDragging, selectedElement, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners for mouse events
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const selectedElementData = designElements.find(
    (el) => el.id === selectedElement
  );
  const currentSideElements = designElements.filter(
    (el) => el.side === currentSide
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Design Canvas */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shirt className="h-5 w-5" />
                  Custom T-Shirt Designer
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={currentSide === "front" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentSide("front")}
                  >
                    Front
                  </Button>
                  <Button
                    variant={currentSide === "back" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentSide("back")}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="relative mx-auto bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg p-4"
                style={{ width: "450px", height: "550px" }}
              >
                {/* T-shirt Model */}
                <div className="absolute inset-4">
                  {currentSide === "front" ? (
                    <TshirtFront
                      color={selectedColor.value}
                      style={selectedStyle.value}
                    />
                  ) : (
                    <TshirtBack
                      color={selectedColor.value}
                      style={selectedStyle.value}
                    />
                  )}
                </div>

                {/* Design Area - positioned over the t-shirt */}
                <div
                  ref={canvasRef}
                  className="absolute cursor-crosshair"
                  style={{
                    top: "120px",
                    left: "120px",
                    width: "210px",
                    height: "280px",
                    backgroundColor: "transparent",
                  }}
                >
                  {currentSideElements.map((element) => (
                    <div
                      key={element.id}
                      className={cn(
                        "absolute cursor-move border-2 border-transparent hover:border-blue-400 transition-all",
                        selectedElement === element.id &&
                          "border-blue-500 border-dashed shadow-lg"
                      )}
                      style={{
                        left: element.x,
                        top: element.y,
                        width: element.width,
                        height: element.height,
                        transform: `rotate(${element.rotation}deg)`,
                        zIndex: 10,
                      }}
                      onMouseDown={(e) => handleMouseDown(e, element.id)}
                    >
                      <img
                        src={element.src}
                        alt="Design element"
                        className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                        draggable={false}
                      />
                      {selectedElement === element.id && (
                        <div className="absolute -top-8 -right-8 flex gap-1 z-20">
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-6 w-6 p-0 shadow-md"
                            onClick={() => deleteElement(element.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Side indicator */}
                <div className="absolute top-2 right-2 bg-black/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-gray-700">
                    {currentSide === "front" ? "Front View" : "Back View"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* T-shirt Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                T-Shirt Style
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Color</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {tshirtColors.map((color) => (
                    <button
                      key={color.value}
                      className={cn(
                        "w-full h-10 rounded border-2 transition-all",
                        selectedColor.value === color.value
                          ? "border-primary scale-105"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label>Style</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {tshirtStyles.map((style) => (
                    <Button
                      key={style.value}
                      variant={
                        selectedStyle.value === style.value
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedStyle(style)}
                      className="justify-start"
                    >
                      {style.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Design Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Design Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="assets" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>

                <TabsContent value="assets" className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search assets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('all')}
                      className="text-xs"
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedCategory === 'emoji' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('emoji')}
                      className="text-xs"
                    >
                      <Smile className="h-3 w-3 mr-1" />
                      Emojis
                    </Button>
                    <Button
                      variant={selectedCategory === 'anime' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('anime')}
                      className="text-xs"
                    >
                      <ImageIcon className="h-3 w-3 mr-1" />
                      Anime
                    </Button>
                    <Button
                      variant={selectedCategory === 'gaming' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('gaming')}
                      className="text-xs"
                    >
                      <Gamepad2 className="h-3 w-3 mr-1" />
                      Gaming
                    </Button>
                    <Button
                      variant={selectedCategory === 'vector' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('vector')}
                      className="text-xs"
                    >
                      Vectors
                    </Button>
                    <Button
                      variant={selectedCategory === 'text' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('text')}
                      className="text-xs"
                    >
                      <Type className="h-3 w-3 mr-1" />
                      Text
                    </Button>
                  </div>

                  {/* Asset Grid */}
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {getFilteredAssets().map((asset) => (
                      <Button
                        key={asset.id}
                        variant="outline"
                        size="sm"
                        onClick={() => addAsset(asset)}
                        className="h-20 flex flex-col gap-1 p-2 hover:bg-muted/50"
                        title={asset.name}
                      >
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                          {asset.category === 'emoji' && <Smile className="h-4 w-4" />}
                          {asset.category === 'anime' && <ImageIcon className="h-4 w-4" />}
                          {asset.category === 'gaming' && <Gamepad2 className="h-4 w-4" />}
                          {asset.category === 'vector' && <div className="w-3 h-3 bg-primary rounded-full" />}
                          {asset.category === 'text' && <Type className="h-4 w-4" />}
                        </div>
                        <div className="text-xs text-center leading-tight">
                          {asset.name.length > 15 ? `${asset.name.substring(0, 15)}...` : asset.name}
                        </div>
                      </Button>
                    ))}
                  </div>

                  {getFilteredAssets().length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No assets found</p>
                      <p className="text-xs">Try a different search or category</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <div className="text-center p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Upload Your Design</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      PNG, JPG, SVG up to 5MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={SUPPORTED_FORMATS.all.join(',')}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>Tips for best results:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Use PNG files with transparent backgrounds</li>
                      <li>High resolution images (300+ DPI) work best</li>
                      <li>SVG files scale perfectly at any size</li>
                      <li>Keep file size under 5MB for faster loading</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Element Controls */}
          {selectedElementData && (
            <Card>
              <CardHeader>
                <CardTitle>Element Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Width: {selectedElementData.width}px</Label>
                  <Slider
                    value={[selectedElementData.width]}
                    onValueChange={([value]) =>
                      updateElement(selectedElement!, { width: value })
                    }
                    min={20}
                    max={300}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Height: {selectedElementData.height}px</Label>
                  <Slider
                    value={[selectedElementData.height]}
                    onValueChange={([value]) =>
                      updateElement(selectedElement!, { height: value })
                    }
                    min={20}
                    max={300}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Rotation: {selectedElementData.rotation}°</Label>
                  <Slider
                    value={[selectedElementData.rotation]}
                    onValueChange={([value]) =>
                      updateElement(selectedElement!, { rotation: value })
                    }
                    min={-180}
                    max={180}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateElement(selectedElement!, {
                        rotation: selectedElementData.rotation - 15,
                      })
                    }
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateElement(selectedElement!, {
                        rotation: selectedElementData.rotation + 15,
                      })
                    }
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteElement(selectedElement!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart - $29.99
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Save Design
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
