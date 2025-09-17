"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  Download, 
  Trash2, 
  Eye, 
  Copy,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DesignAsset, SUPPORTED_FORMATS, MAX_FILE_SIZE } from "@/lib/design-assets"

interface AssetUpload {
  file: File
  preview: string
  category: DesignAsset['category']
  name: string
  tags: string[]
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export function AssetManager() {
  const [uploads, setUploads] = useState<AssetUpload[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFiles = (files: FileList | null, category: DesignAsset['category'] = 'vector') => {
    if (!files) return

    const newUploads: AssetUpload[] = []
    
    Array.from(files).forEach((file) => {
      // Validate file
      const isValidFormat = SUPPORTED_FORMATS.all.some(format => 
        file.name.toLowerCase().endsWith(format)
      )
      
      if (!isValidFormat) {
        newUploads.push({
          file,
          preview: '',
          category,
          name: file.name,
          tags: [],
          status: 'error',
          error: 'Unsupported file format'
        })
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        newUploads.push({
          file,
          preview: '',
          category,
          name: file.name,
          tags: [],
          status: 'error',
          error: 'File too large (max 5MB)'
        })
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const upload: AssetUpload = {
          file,
          preview: e.target?.result as string,
          category,
          name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          tags: [],
          status: 'pending'
        }
        
        setUploads(prev => [...prev, upload])
      }
      reader.readAsDataURL(file)
    })

    // Add error uploads immediately
    if (newUploads.length > 0) {
      setUploads(prev => [...prev, ...newUploads])
    }
  }

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Update upload properties
  const updateUpload = (index: number, updates: Partial<AssetUpload>) => {
    setUploads(prev => prev.map((upload, i) => 
      i === index ? { ...upload, ...updates } : upload
    ))
  }

  // Remove upload
  const removeUpload = (index: number) => {
    setUploads(prev => prev.filter((_, i) => i !== index))
  }

  // Simulate upload process
  const uploadAsset = async (index: number) => {
    const upload = uploads[index]
    updateUpload(index, { status: 'uploading' })

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would:
      // 1. Upload file to your storage (AWS S3, Cloudinary, etc.)
      // 2. Save asset metadata to your database
      // 3. Update the design-assets.ts file or database
      
      updateUpload(index, { status: 'success' })
    } catch (error) {
      updateUpload(index, { 
        status: 'error', 
        error: 'Upload failed. Please try again.' 
      })
    }
  }

  // Generate asset code
  const generateAssetCode = (upload: AssetUpload) => {
    const id = `${upload.category}-${Date.now()}`
    const code = `{
  id: '${id}',
  name: '${upload.name}',
  category: '${upload.category}',
  type: '${upload.file.name.split('.').pop()}',
  url: '/assets/${upload.category}/${upload.file.name}',
  tags: [${upload.tags.map(tag => `'${tag}'`).join(', ')}]
}`
    
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Asset Manager
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload and manage design assets for your t-shirt designer
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Assets</TabsTrigger>
              <TabsTrigger value="manage">Manage Assets</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              {/* Upload Area */}
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Upload Design Assets</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop files here, or click to select
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={SUPPORTED_FORMATS.all.join(',')}
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground mt-4">
                  Supports: PNG, JPG, SVG • Max size: 5MB per file
                </p>
              </div>

              {/* Upload Queue */}
              {uploads.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Upload Queue</h3>
                  <div className="space-y-3">
                    {uploads.map((upload, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Preview */}
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            {upload.preview ? (
                              <img 
                                src={upload.preview} 
                                alt={upload.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{upload.file.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {upload.status === 'pending' && (
                                  <Badge variant="secondary">Pending</Badge>
                                )}
                                {upload.status === 'uploading' && (
                                  <Badge variant="default">Uploading...</Badge>
                                )}
                                {upload.status === 'success' && (
                                  <Badge variant="default" className="bg-green-500">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Success
                                  </Badge>
                                )}
                                {upload.status === 'error' && (
                                  <Badge variant="destructive">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Error
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {upload.status === 'error' && upload.error && (
                              <p className="text-sm text-destructive">{upload.error}</p>
                            )}

                            {(upload.status === 'pending' || upload.status === 'success') && (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`name-${index}`}>Asset Name</Label>
                                  <Input
                                    id={`name-${index}`}
                                    value={upload.name}
                                    onChange={(e) => updateUpload(index, { name: e.target.value })}
                                    placeholder="Enter asset name"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`category-${index}`}>Category</Label>
                                  <select
                                    id={`category-${index}`}
                                    value={upload.category}
                                    onChange={(e) => updateUpload(index, { 
                                      category: e.target.value as DesignAsset['category'] 
                                    })}
                                    className="w-full px-3 py-2 border border-input rounded-md"
                                  >
                                    <option value="emoji">Emoji</option>
                                    <option value="anime">Anime</option>
                                    <option value="gaming">Gaming</option>
                                    <option value="vector">Vector</option>
                                    <option value="text">Text</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            {upload.status === 'success' && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => generateAssetCode(upload)}
                                >
                                  <Copy className="h-3 w-3 mr-1" />
                                  Copy Code
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            {upload.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => uploadAsset(index)}
                              >
                                Upload
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeUpload(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="manage" className="space-y-6">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Asset Management</h3>
                <p className="text-muted-foreground mb-4">
                  View and manage your uploaded assets
                </p>
                <p className="text-sm text-muted-foreground">
                  This feature would connect to your asset database to show all uploaded assets
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}