import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProductQuickView from "./ProductQuickView";
import { Product } from "@/lib/api/products";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent } from "../ui/drawer";

interface ProductQuickViewDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductQuickViewDialog({
  product,
  open,
  onOpenChange,
}: ProductQuickViewDialogProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isClient = useIsClient();

  if (isMobile && isClient) {
    return (
      <Drawer direction="bottom" open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[80vh]">
          <div className="overflow-y-auto">
            {product && <ProductQuickView product={product} />}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl p-0 bg-transparent border-none shadow-none"
        animationType="bounce"
        showCloseButton
      >
        {product && <ProductQuickView product={product} />}
      </DialogContent>
    </Dialog>
  );
}
