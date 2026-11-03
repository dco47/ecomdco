"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import productsData from "@/app/JsonData/TopSelling.json";
import additionalProductsData from "@/app/JsonData/AdditionalProducts.json";

type Product = {
  Id: string;
  title: string;
  image1: string;
  image2: string;
  price: string;
  rating: string;
  sizes: string[];
  label?: string;
  category?: string;
};

type CatalogProduct = Product & {
  category: string;
};

type CartItem = {
  id: string;
  title: string;
  image: string;
  price: string;
  size: string;
  quantity: number;
};

const categoryByProductId: Record<string, string> = {
  "1": "Fruits",
  "2": "Fruits",
  "3": "Légumes",
  "4": "Fruits",
  "5": "Fruits",
  "6": "Fruits",
  "7": "Légumes",
  m8: "Fruits",
  m9: "Légumes",
  m10: "Légumes",
  m11: "Fruits",
  m12: "Fruits",
  m13: "Épicerie",
  m14: "Épicerie",
};

const products = productsData.products as Product[];
const mainProducts = productsData.mainProducts as Product[];
const additionalProducts = additionalProductsData.products as Product[];
const catalog: CatalogProduct[] = [...products, ...mainProducts].map(
  (product) => {
    const imageNumber = product.Id.replace(/^m/, "").padStart(2, "0");

    return {
      ...product,
      image1: `/product-${imageNumber}-1.webp`,
      image2: `/product-${imageNumber}-2.webp`,
      category: categoryByProductId[product.Id] ?? "Autres",
    };
  },
).concat(
  additionalProducts.map((product) => ({
    ...product,
    category: product.category ?? "Autres",
  })),
);
const categories = [
  "Tous les produits",
  ...new Set(catalog.map((product) => product.category)),
];

const parsePrice = (price: string) => Number(price.replace(/\s/g, ""));
const normalizeSearch = (value: string) =>
  value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");
const formatFcfa = (value: number) =>
  new Intl.NumberFormat("fr-FR").format(value);
const maximumPrice = Math.ceil(
  Math.max(...catalog.map((product) => parsePrice(product.price))) / 500,
) * 500;

const labelInFrench: Record<string, string> = {
  Top: "Populaire",
  Nouveau: "Nouveau",
  Promo: "En promotion",
  Meilleur: "Best-seller",
};

export default function ShopPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [priceLimit, setPriceLimit] = useState(maximumPrice);
  const [sortOrder, setSortOrder] = useState("featured");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {},
  );
  const [notice, setNotice] = useState("");
  const noticeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const syncSearchFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setSearch(params.get("search") ?? "");
      const category = params.get("category");
      setSelectedCategory(
        category && categories.includes(category) ? category : categories[0],
      );
    };
    const handleNavbarSearch = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSearch(customEvent.detail);
    };

    syncSearchFromUrl();
    window.addEventListener("popstate", syncSearchFromUrl);
    window.addEventListener("navbar-search", handleNavbarSearch);

    return () => {
      window.removeEventListener("popstate", syncSearchFromUrl);
      window.removeEventListener("navbar-search", handleNavbarSearch);
    };
  }, []);

  useEffect(() => {
    const updateWishlist = () => {
      const stored: unknown = JSON.parse(
        window.localStorage.getItem("wishlist") || "[]",
      );
      setWishlist(
        Array.isArray(stored)
          ? stored.filter((id): id is string => typeof id === "string")
          : [],
      );
    };

    updateWishlist();
    window.addEventListener("wishlist-updated", updateWishlist);

    return () => {
      window.removeEventListener("wishlist-updated", updateWishlist);
    };
  }, []);

  useEffect(
    () => () => {
      if (noticeTimeoutRef.current) {
        clearTimeout(noticeTimeoutRef.current);
      }
    },
    [],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeSearch(search);
    const filtered = catalog.filter((product) => {
      const searchableText = normalizeSearch(
        `${product.title} ${product.category}`,
      );
      const matchesSearch = searchableText.includes(normalizedSearch);
      const matchesCategory =
        selectedCategory === categories[0] ||
        product.category === selectedCategory;
      const matchesPrice = parsePrice(product.price) <= priceLimit;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortOrder === "price-ascending") {
      return filtered.sort(
        (first, second) =>
          parsePrice(first.price) - parsePrice(second.price),
      );
    }

    if (sortOrder === "price-descending") {
      return filtered.sort(
        (first, second) =>
          parsePrice(second.price) - parsePrice(first.price),
      );
    }

    if (sortOrder === "name") {
      return filtered.sort((first, second) =>
        first.title.localeCompare(second.title, "fr"),
      );
    }

    return filtered;
  }, [priceLimit, search, selectedCategory, sortOrder]);

  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const updatedWishlist = isSaved
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    window.localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  const addToCart = (product: CatalogProduct) => {
    const stored: CartItem[] = JSON.parse(
      window.localStorage.getItem("cart") || "[]",
    );
    const cartItem: CartItem = {
      id: product.Id,
      title: product.title,
      image: product.image1,
      price: product.price,
      size: selectedSizes[product.Id] ?? product.sizes[0],
      quantity: 1,
    };

    window.localStorage.setItem("cart", JSON.stringify([...stored, cartItem]));
    window.dispatchEvent(new Event("cartUpdated"));
    setNotice(`${product.title} ajouté au panier`);
    if (noticeTimeoutRef.current) {
      clearTimeout(noticeTimeoutRef.current);
    }
    noticeTimeoutRef.current = setTimeout(() => setNotice(""), 2500);
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory(categories[0]);
    setPriceLimit(maximumPrice);
    setSortOrder("featured");
    router.replace("/UI-Components/Pages/Shop", { scroll: false });
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gray-light">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-prim-dark">
            DcoShop · Produits frais
          </p>
          <h1 className="mt-3 font-unbounded text-3xl font-semibold text-gray-900 sm:text-5xl">
            La boutique
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Retrouvez vos produits préférés et faites vos achats en quelques
            clics.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-unbounded text-base font-semibold text-gray-900">
                Filtres
              </h2>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-prim-dark hover:underline"
              >
                Tout effacer
              </button>
            </div>

            <label
              htmlFor="shop-search"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Rechercher un produit
            </label>
            <div className="flex items-center rounded-md border border-gray-200 px-3 focus-within:border-prim">
              <Icon
                icon="iconamoon:search-thin"
                width="20"
                height="20"
                className="shrink-0 text-gray-400"
              />
              <input
                id="shop-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Ex. fraise, citron..."
                className="min-w-0 flex-1 border-0 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="mt-7 border-t border-gray-100 pt-5">
              <h3 className="mb-3 text-sm font-semibold text-gray-800">
                Catégories
              </h3>
              <ul className="space-y-1">
                {categories.map((category) => {
                  const count =
                    category === categories[0]
                      ? catalog.length
                      : catalog.filter(
                          (product) => product.category === category,
                        ).length;
                  const isSelected = selectedCategory === category;

                  return (
                    <li key={category}>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        aria-pressed={isSelected}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          isSelected
                            ? "bg-prim/10 font-semibold text-prim-dark"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span>{category}</span>
                        <span className="text-xs text-gray-400">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-7 border-t border-gray-100 pt-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">
                  Prix maximum
                </h3>
                <span className="text-xs font-semibold text-prim-dark">
                  {formatFcfa(priceLimit)} FCFA
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={maximumPrice}
                step="100"
                value={priceLimit}
                onChange={(event) => setPriceLimit(Number(event.target.value))}
                aria-label="Prix maximum"
                className="w-full cursor-pointer accent-prim-dark"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>0 FCFA</span>
                <span>{formatFcfa(maximumPrice)} FCFA</span>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600" aria-live="polite">
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                produit{filteredProducts.length !== 1 ? "s" : ""} trouvé
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                Trier par
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  className="rounded-md border border-gray-200 bg-white px-3 py-2 font-medium text-gray-800 outline-none focus:border-prim"
                >
                  <option value="featured">En vedette</option>
                  <option value="name">Nom, A à Z</option>
                  <option value="price-ascending">Prix croissant</option>
                  <option value="price-descending">Prix décroissant</option>
                </select>
              </label>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article
                    key={product.Id}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <Image
                        src={product.image1}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <Image
                        src={product.image2}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />

                      {product.label && (
                        <span className="absolute left-2 top-2 z-10 rounded-sm bg-secondary px-2 py-1 text-[10px] font-semibold text-gray-900 sm:left-3 sm:top-3 sm:text-xs">
                          {labelInFrench[product.label] ?? product.label}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.Id)}
                        aria-label={
                          wishlist.includes(product.Id)
                            ? `Retirer ${product.title} des favoris`
                            : `Ajouter ${product.title} aux favoris`
                        }
                        aria-pressed={wishlist.includes(product.Id)}
                        className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:text-prim sm:right-3 sm:top-3"
                      >
                        <Icon
                          icon={
                            wishlist.includes(product.Id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width="20"
                          height="20"
                        />
                      </button>
                    </div>

                    <div className="space-y-3 p-3 sm:p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-gray-400 sm:text-xs">
                            {product.category}
                          </p>
                          <h2 className="line-clamp-2 min-h-10 text-sm font-semibold text-gray-900 sm:text-base">
                            {product.title}
                          </h2>
                        </div>
                        <span className="flex shrink-0 items-center gap-1 rounded bg-green-50 px-1.5 py-1 text-xs font-semibold text-green-700">
                          <Icon icon="mdi:star" width="14" height="14" />
                          {product.rating}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-bold text-prim-dark sm:text-base">
                          {formatFcfa(parsePrice(product.price))} FCFA
                        </p>
                        <select
                          aria-label={`Format de ${product.title}`}
                          value={selectedSizes[product.Id] ?? product.sizes[0]}
                          onChange={(event) =>
                            setSelectedSizes((current) => ({
                              ...current,
                              [product.Id]: event.target.value,
                            }))
                          }
                          className="max-w-24 rounded-md border border-gray-200 bg-white px-1.5 py-1.5 text-xs text-gray-700 outline-none focus:border-prim sm:max-w-28 sm:px-2 sm:text-sm"
                        >
                          {product.sizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-light px-3 py-2.5 text-xs font-semibold text-gray-900 transition-colors hover:bg-prim hover:text-white sm:text-sm"
                      >
                        Ajouter au panier
                        <Icon
                          icon="lucide:shopping-bag"
                          width="17"
                          height="17"
                        />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 px-5 py-16 text-center">
                <Icon
                  icon="solar:magnifer-linear"
                  width="40"
                  height="40"
                  className="mx-auto text-gray-400"
                />
                <h2 className="mt-4 text-lg font-semibold text-gray-900">
                  Aucun produit trouvé
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Modifiez votre recherche ou vos filtres pour voir les produits.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-md bg-prim px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-prim-dark"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-5 right-5 z-50 rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all ${
          notice ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <span className="flex items-center gap-2">
          <Icon icon="lucide:shopping-cart" width="18" height="18" />
          {notice}
        </span>
      </div>
    </main>
  );
}
