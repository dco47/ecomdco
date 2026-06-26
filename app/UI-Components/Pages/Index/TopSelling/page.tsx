"use client";

import Image from "next/image";
import titleicon from "@/public/freshbite-title-icon1.png";
import productsData from "@/app/JsonData/TopSelling.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

type ProductType = {
  Id: string;
  title: string;
  image1: string;
  image2: string;
  price: string;
  rating: string;
  sizes: string[];
  label?: string;
};

type ProductsPayload = {
  products: ProductType[];
  mainProducts: ProductType[];
};

const { products, mainProducts } = productsData as ProductsPayload;

export default function TopSelling() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {},
  );
  const [showCartToast, setShowCartToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showWishlistToast, setShowWishlistToast] = useState(false);
  const [wishlistToastMessage, setWishlistToastMessage] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wishlistToastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const parsePrice = (price: string) => Number(price.replace(/\s/g, ""));
  const formatFcfa = (value: number) =>
    new Intl.NumberFormat("fr-FR").format(value);

  useEffect(() => {
    const handleUpdate = () => {
      const stored: string[] = JSON.parse(
        localStorage.getItem("wishlist") || "[]",
      );
      setWishlist(stored);
    };

    handleUpdate();
    window.addEventListener("wishlist-updated", handleUpdate);

    return () => {
      window.removeEventListener("wishlist-updated", handleUpdate);
    };
  }, []);

  const toggleWishlist = (product: ProductType) => {
    const productId = product.Id;
    const stored: string[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]",
    );
    const isAdding = !stored.includes(productId);
    const updated = stored.includes(productId)
      ? stored.filter((id) => id !== productId)
      : [...stored, productId];

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
    window.dispatchEvent(new Event("wishlist-updated"));

    if (isAdding) {
      setWishlistToastMessage(`${product.title} ajouté aux favoris`);
      setShowWishlistToast(true);

      if (wishlistToastTimeoutRef.current) {
        clearTimeout(wishlistToastTimeoutRef.current);
      }

      wishlistToastTimeoutRef.current = setTimeout(() => {
        setShowWishlistToast(false);
      }, 2500);
    }
  };

  const handleAddToCart = (product: ProductType) => {
    const quantity = quantities[product.Id] ?? 1;
    const size = selectedSizes[product.Id] ?? product.sizes[0];
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");

    const cartItem = {
      id: product.Id,
      title: product.title,
      image: product.image1,
      price: product.price,
      size,
      quantity,
    };

    const updatedCart = [...stored, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setToastMessage(`${product.title} ajoute au panier`);
    setShowCartToast(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setShowCartToast(false);
    }, 1800);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }

      if (wishlistToastTimeoutRef.current) {
        clearTimeout(wishlistToastTimeoutRef.current);
      }
    };
  }, []);

  const incrementQuantity = (productId: string) => {
    setQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 1) + 1,
    }));
  };

  const decrementQuantity = (productId: string) => {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(1, (current[productId] ?? 1) - 1),
    }));
  };

  return (
    <>
      <div
        className={`pointer-events-none fixed right-4 top-4 z-70 transition-all duration-300 ${showCartToast ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
      >
        <div className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <Icon icon="lucide:shopping-cart" width="16" height="16" />
          <span>{toastMessage || "Produit ajouté au panier"}</span>
        </div>
      </div>

      <div
        className={`pointer-events-none fixed right-4 top-18 z-70 transition-all duration-300 ${showWishlistToast ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
      >
        <div className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg ring-1 ring-red-200">
          <Icon icon="mdi:heart" width="16" height="16" className="text-red-500" />
          <span>{wishlistToastMessage || "Produit ajouté aux favoris"}</span>
        </div>
      </div>

      <div className="mx-auto max-w-340 px-2 pt-20 pb-10 lg:px-4 xl:px-5">
        {/* Section Title */}
        <div className="mb-12 flex flex-col items-start justify-start gap-2 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex items-center justify-start gap-2">
            <h2 className="text-2xl font-bold lg:text-4xl">
              Les produits les plus vendus
            </h2>
            <Image
              src={titleicon}
              alt="Title Icon"
              className="h-6 w-6 lg:h-8 lg:w-8"
            />
          </div>
          <p className="max-w-md text-left text-sm text-gray-600 lg:text-base">
            Frais et fabuleux, de la ferme à l'assiette !
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={1500}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1100: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
            1600: { slidesPerView: 5 },
          }}
          className="w-full product-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.Id}>
              {(() => {
                const quantity = quantities[product.Id] ?? 1;
                const totalPrice = parsePrice(product.price) * quantity;

                return (
                  <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
                    {product.label && (
                      <span className="absolute left-3 top-3 z-10 rounded bg-secondary-dark px-2 py-1 text-xs font-medium text-white">
                        {product.label}
                      </span>
                    )}

                    <div className="relative h-72 overflow-hidden bg-gray-50 lg:h-60">
                      <Image
                        src={product.image1}
                        alt={product.title}
                        fill
                        className="object-cover opacity-100 transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <Image
                        src={product.image2}
                        alt={product.title}
                        fill
                        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />

                      <button
                        type="button"
                        onClick={() => toggleWishlist(product)}
                        className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 pointer-events-none opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 hover:text-prim"
                        aria-label="Ajouter aux favoris"
                      >
                        <Icon
                          icon={
                            wishlist.includes(product.Id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width="20"
                          height="20"
                          className={
                            wishlist.includes(product.Id)
                              ? "text-prim"
                              : "text-current"
                          }
                        />
                      </button>

                      <button
                        type="button"
                        className="absolute right-3 top-14 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 pointer-events-none opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 hover:text-prim"
                        aria-label={`Modalite de paiement pour ${product.title}`}
                        title="Modalite de paiement"
                      >
                        <Icon icon="mdi:eye-outline" width="20" height="20" />
                      </button>
                    </div>

                    <div className="space-y-3 p-3">
                      <h3 className="cursor-pointer text-sm font-semibold text-black line-clamp-2">
                        {product.title}
                      </h3>

                      <div className="flex items-center justify-between gap-2">
                        <div className="rounded-md border border-gray-200 px-2 py-1.5 text-left">
                          <select
                            value={
                              selectedSizes[product.Id] ?? product.sizes[0]
                            }
                            onChange={(event) =>
                              setSelectedSizes((current) => ({
                                ...current,
                                [product.Id]: event.target.value,
                              }))
                            }
                            className="cursor-pointer bg-transparent text-sm font-semibold text-black outline-none"
                          >
                            {product.sizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1.5">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(product.Id)}
                            className="text-2xl leading-none text-black transition-colors duration-300 hover:text-prim"
                            aria-label="Diminuer la quantité"
                          >
                            −
                          </button>
                          <span className="min-w-5 text-center text-sm font-semibold text-black">
                            {quantities[product.Id] ?? 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementQuantity(product.Id)}
                            className="text-2xl leading-none text-black transition-colors duration-300 hover:text-prim"
                            aria-label="Augmenter la quantité"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-lg font-bold text-black">
                          {formatFcfa(totalPrice)} FCFA
                        </p>
                        <div className="flex items-center gap-1.5 rounded-md bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                          <Icon icon="mdi:star" width="16" height="16" />
                          {product.rating}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
                      >
                        Ajouter au panier
                        <Icon
                          icon="lucide:shopping-bag"
                          width="18"
                          height="18"
                        />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3600, disableOnInteraction: false }}
          loop={true}
          speed={1500}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1100: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
            1600: { slidesPerView: 5 },
          }}
          className="mt-8 w-full product-swiper"
        >
          {mainProducts.map((product) => (
            <SwiperSlide key={`second-${product.Id}`}>
              {(() => {
                const quantity = quantities[product.Id] ?? 1;
                const totalPrice = parsePrice(product.price) * quantity;

                return (
                  <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
                    {product.label && (
                      <span className="absolute left-3 top-3 z-10 rounded bg-secondary-dark px-2 py-1 text-xs font-medium text-white">
                        {product.label}
                      </span>
                    )}

                    <div className="relative h-72 overflow-hidden bg-gray-50 lg:h-60">
                      <Image
                        src={product.image1}
                        alt={product.title}
                        fill
                        className="object-cover opacity-100 transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <Image
                        src={product.image2}
                        alt={product.title}
                        fill
                        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />

                      <button
                        type="button"
                        onClick={() => toggleWishlist(product)}
                        className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 pointer-events-none opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 hover:text-prim"
                        aria-label="Ajouter aux favoris"
                      >
                        <Icon
                          icon={
                            wishlist.includes(product.Id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width="20"
                          height="20"
                          className={
                            wishlist.includes(product.Id)
                              ? "text-prim"
                              : "text-current"
                          }
                        />
                      </button>

                      <button
                        type="button"
                        className="absolute right-3 top-14 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 pointer-events-none opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 hover:text-prim"
                        aria-label={`Modalite de paiement pour ${product.title}`}
                        title="Modalite de paiement"
                      >
                        <Icon icon="mdi:eye-outline" width="20" height="20" />
                      </button>
                    </div>

                    <div className="space-y-3 p-3">
                      <h3 className="cursor-pointer text-sm font-semibold text-black line-clamp-2">
                        {product.title}
                      </h3>

                      <div className="flex items-center justify-between gap-2">
                        <div className="rounded-md border border-gray-200 px-2 py-1.5 text-left">
                          <select
                            value={
                              selectedSizes[product.Id] ?? product.sizes[0]
                            }
                            onChange={(event) =>
                              setSelectedSizes((current) => ({
                                ...current,
                                [product.Id]: event.target.value,
                              }))
                            }
                            className="cursor-pointer bg-transparent text-sm font-semibold text-black outline-none"
                          >
                            {product.sizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1.5">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(product.Id)}
                            className="text-2xl leading-none text-black transition-colors duration-300 hover:text-prim"
                            aria-label="Diminuer la quantité"
                          >
                            −
                          </button>
                          <span className="min-w-5 text-center text-sm font-semibold text-black">
                            {quantities[product.Id] ?? 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementQuantity(product.Id)}
                            className="text-2xl leading-none text-black transition-colors duration-300 hover:text-prim"
                            aria-label="Augmenter la quantité"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-lg font-bold text-black">
                          {formatFcfa(totalPrice)} FCFA
                        </p>
                        <div className="flex items-center gap-1.5 rounded-md bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                          <Icon icon="mdi:star" width="16" height="16" />
                          {product.rating}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
                      >
                        Ajouter au panier
                        <Icon
                          icon="lucide:shopping-bag"
                          width="18"
                          height="18"
                        />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
