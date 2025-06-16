// app/product/[id]/page.tsx
import { use } from "react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductTabs } from "@/components/products/ProductTabs";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { fetchProduct, type Product } from "@/lib/api/products";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = use(fetchProduct(params.id)) as Product;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          {
            label: product.category,
            href: `/category/${product.categorySlug}`,
          },
          { label: product.name, href: "#" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs
        description={product.description}
        specifications={product.specifications}
        reviews={product.reviews}
      />

      <RelatedProducts
        categoryId={product.categoryId}
        currentProductId={product.id}
      />
    </div>
  );
}
