// components/ui/ShareButtons.tsx
import { Button } from "./button";
import { Facebook, Twitter, Link as LinkIcon, Share2 } from "lucide-react";
import { toast } from "sonner";

export function ShareButtons() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async (platform: string) => {
    const shareData = {
      title: "Sahha Now - Product",
      text: "Check out this product on Sahha Now",
      url: shareUrl,
    };

    try {
      switch (platform) {
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`,
            "_blank"
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              shareUrl
            )}&text=${encodeURIComponent(shareData.text)}`,
            "_blank"
          );
          break;
        case "whatsapp":
          window.open(
            `https://wa.me/?text=${encodeURIComponent(
              `${shareData.text} ${shareUrl}`
            )}`,
            "_blank"
          );
          break;
        case "copy":
          await navigator.clipboard.writeText(shareUrl);
          toast.success("تم نسخ الرابط بنجاح");
          break;
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("حدث خطأ أثناء المشاركة");
    }
  };

  const shareButtons = [
    {
      platform: "facebook",
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      platform: "twitter",
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      platform: "whatsapp",
      icon: <Share2 className="h-4 w-4" />,
    },
    {
      platform: "copy",
      icon: <LinkIcon className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-700">مشاركة:</span>
      <div className="flex gap-2">
        {shareButtons.map((button) => (
          <Button
            key={button.platform}
            variant="outline"
            size="icon"
            onClick={() => handleShare(button.platform)}
            className="h-8 w-8"
          >
            {button.icon}
          </Button>
        ))}
      </div>
    </div>
  );
}
