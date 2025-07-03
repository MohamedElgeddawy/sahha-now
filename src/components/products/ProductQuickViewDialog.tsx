import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProductQuickView from "./ProductQuickView";
import { Product } from "@/lib/api/products";

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
