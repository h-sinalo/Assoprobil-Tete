"use client"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import Image from "next/image"
import imageCompression from "browser-image-compression"

interface ImageUploadProps {
    value?: string | string[]
    onChange: (value: string | string[]) => void
    multiple?: boolean
    bucket?: string
    folder?: string
}

export function ImageUpload({
    value,
    onChange,
    multiple = false,
    bucket = "images",
    folder = "uploads",
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const urls = Array.isArray(value) ? value : value ? [value] : []

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        setProgress(0)

        const newUrls: string[] = [...urls]

        const options = {
            maxSizeMB: 0.8,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }

        try {
            for (let i = 0; i < files.length; i++) {
                let file = files[i]

                // Compress image if it's an image file
                if (file.type.startsWith("image/")) {
                    try {
                        const compressedFile = await imageCompression(file, options)
                        // Preserve original name but with compressed blob
                        file = new File([compressedFile], file.name, {
                            type: compressedFile.type,
                        })
                    } catch (compressionError) {
                        console.error("Compression failed, uploading original:", compressionError)
                    }
                }

                const fileExt = file.name.split(".").pop()
                const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
                const filePath = folder ? `${folder}/${fileName}` : fileName

                const { data, error } = await supabase.storage
                    .from(bucket)
                    .upload(filePath, file, {
                        upsert: false,
                    })

                if (error) throw error

                const { data: { publicUrl } } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(filePath)

                if (multiple) {
                    newUrls.push(publicUrl)
                } else {
                    newUrls[0] = publicUrl
                    break
                }

                setProgress(Math.round(((i + 1) / files.length) * 100))
            }

            onChange(multiple ? newUrls : newUrls[0])
            toast.success("Imagem carregada e optimizada com sucesso")
        } catch (error: any) {
            console.error("Upload error:", error)
            toast.error(`Erro no carregamento: ${error.message}`)
        } finally {
            setUploading(false)
            setProgress(0)
            if (fileInputRef.current) fileInputRef.current.value = ""
        }
    }

    const removeImage = (urlToRemove: string) => {
        const newUrls = urls.filter((url) => url !== urlToRemove)
        onChange(multiple ? newUrls : "")
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                {urls.map((url) => (
                    <div key={url} className="relative aspect-square w-32 overflow-hidden rounded-lg border border-border">
                        <Image
                            src={url}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            onClick={() => removeImage(url)}
                            className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-white shadow-sm hover:bg-destructive/90"
                            type="button"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
                {(multiple || urls.length === 0) && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex aspect-square w-32 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition hover:bg-muted"
                    >
                        {uploading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                            <Upload className="h-6 w-6 text-muted-foreground" />
                        )}
                        <span className="text-xs text-muted-foreground">
                            {uploading ? `${progress}%` : "Carregar"}
                        </span>
                    </button>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                multiple={multiple}
                accept="image/*"
                className="hidden"
            />

            {uploading && (
                <Progress value={progress} className="h-1 w-full" />
            )}
        </div>
    )
}
