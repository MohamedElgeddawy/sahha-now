"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, X, CloudCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CameraDialogDrawerProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CameraDialogDrawer({
  children,
  open,
  onOpenChange,
}: CameraDialogDrawerProps) {
  const [isOpen, setIsOpen] = useState(open || false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setPreviewUrl(URL.createObjectURL(droppedFile));
      }
    }
  };
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const CameraContent = () => (
    <div className="space-y-6">
      {/* Camera Preview Area */}
      <button
        onClick={() => ref.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative w-full bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300 transition-all scale-100 duration-200",
          { "border-blue-500 bg-blue-50 scale-105": isDragOver }
        )}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          placeholder="اختر صورة..."
          onChange={handleFileChange}
        />
        <div className="text-center space-y-4">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain"
            />
          ) : (
            <>
              <CloudCheck className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-xs text-gray-500 text-center">
                اسحب الصورة هنا أو اخترها من جهازك للبحث عن المنتجات المشابهة
              </p>
              <div className="space-y-3">
                <Button onClick={() => ref.current?.click()}>
                  اضغط لاختيار ملف
                </Button>
              </div>
            </>
          )}
        </div>
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-lg font-semibold">
                البحث بالصورة
              </DrawerTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleOpenChange(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DrawerHeader>
          <div className="p-6 overflow-y-auto">
            <CameraContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            البحث بالصورة
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <CameraContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
