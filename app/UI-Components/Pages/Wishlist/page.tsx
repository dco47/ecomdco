"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import productsData from "@/app/JsonData/TopSelling.json";

type ProductType = {
  Id: string;
  title: string;
  image1?: string;
  image2?: string;
  price?: string;
  rating?: string;
  sizes?: string[];
  label?: string;
};

type ProductsPayload = {
  products: ProductType[];
  mainProducts: ProductType[];
};

const { products, mainProducts } = productsData as ProductsPayload;
const allProducts = [...products, ...mainProducts];

export default function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = () => {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const items = stored
        .map((id: string) => allProducts.find((p) => p.Id === id))
        .filter((p: ProductType | undefined) => p !== undefined) as ProductType[];
      setWishlistProducts(items);
      setLoading(false);
    };

    loadWishlist();
    window.addEventListener("wishlist-updated", loadWishlist);

    return () => {
      window.removeEventListener("wishlist-updated", loadWishlist);
    };
  }, []);

  const removeFromWishlist = (productId: string) => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const updated = stored.filter((id: string) => id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-light py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-black">Mes Favoris</h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <Icon icon="tabler:heart-broken" width="64" height="64" className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-6">Vous n'avez pas de produits en favoris</p>
            <Link
              href="/"
              className="inline-block bg-prim text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              Continuer vos achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wishlistProducts.map((product) => (
              <div key={product.Id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group">
                <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-lg">
                  {product.image1 && (
                    <img
                      src={product.image1}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                  {product.label && (
                    <span className="absolute top-2 left-2 bg-prim text-white text-xs font-bold px-2 py-1 rounded">
                      {product.label}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-black mb-2 truncate">{product.title}</h3>
                  
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <Icon icon="mdi:star" width="16" height="16" className="text-yellow-500" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  )}

                  {product.price && (
                    <p className="text-lg font-bold text-prim mb-3">{product.price} FCFA</p>
                  )}

                  <button
                    onClick={() => removeFromWishlist(product.Id)}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                  >
                    <Icon icon="tabler:heart-filled" width="18" height="18" />
                    Retirer des favoris
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
