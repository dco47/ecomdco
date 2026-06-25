"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import ctg1 from "@/public/freshbite-cat1.png";
import ctg2 from "@/public/freshbite-cat2.png";
import ctg3 from "@/public/freshbite-cat3.png";
import ctg4 from "@/public/freshbite-cat4.png";
import ctg5 from "@/public/freshbite-cat5.png";
import ctg6 from "@/public/freshbite-cat6.png";
import ctg7 from "@/public/freshbite-cat7.png";

export default function Navbottom() {
  const [catOpen, setCatOpen] = useState(false);

  const categories = [
    {
      name: "Le lait et les produits laitiers",
      image: ctg1,
      link: "/UI-Components/Pages/Shop",
    },
    {
      name: "Les legumes et les fruits",
      image: ctg2,
      link: "/UI-Components/Pages/Shop",
    },
    {
      name: "Le petit-déjeuner et les céréales",
      image: ctg3,
      link: "/UI-Components/Pages/Shop",
    },
    {
      name: "Les biscuits et produits pour animaux",
      image: ctg4,
      link: "/UI-Components/Pages/Shop",
    },
    {
      name: "Le pain, les biscottes et les biscuits",
      image: ctg5,
      link: "/UI-Components/Pages/Shop",
    },
    {
      name: "Le poulet, la viande et le poisson",
      image: ctg6,
      link: "/UI-Components/Pages/Shop",
    },
    {
      name: "Les vitamines et les minéraux",
      image: ctg7,
      link: "/UI-Components/Pages/Shop",
    },
    {
      name: "La crème glacée et les boissons fraîches",
      image: ctg1,
      link: "/UI-Components/Pages/Shop",
    },
  ];
  const [pagesOpen, setPagesOpen] = useState(false);

  const pages = [
    { name: "À propos", link: "/UI-Components/Pages/About" },
    { name: "Contact", link: "/UI-Components/Pages/Contact" },
    { name: "FAQs", link: "/UI-Components/Pages/Faqs" },
    { name: "page non trouvée", link: "/UI-Components/Pages/PageNotFound" },
  ];

  return (
    <nav className="hidden w-full lg:block">
      <div className="mx-2 my-3 flex items-center gap-2 rounded-md bg-prim lg:mx-8 xl:mx-12">
        {/* Bouton "Acheter par catégories" avec dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setCatOpen((prev) => !prev)}
            className="flex min-w-68 items-center gap-2 bg-black/20 px-6 py-4 font-semibold text-white transition-colors duration-300 hover:bg-black/30"
            aria-expanded={catOpen}
            aria-controls="nav-categories"
          >
            <Icon icon="material-symbols-light:menu" width="22" height="22" />
            <span className="text-sm">Acheter par catégories</span>
            <Icon
              icon="solar:alt-arrow-down-outline"
              width="16"
              height="16"
              className={`transition-transform duration-300 ${catOpen ? "" : "rotate-180"}`}
            />
          </button>

          {/* Dropdown catégories */}
          {catOpen && (
            <>
              {/* Fond de fermeture */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setCatOpen(false)}
              />
              <ul
                id="nav-categories"
                className="absolute left-0 top-full z-20 min-w-56 overflow-hidden rounded-b-xl bg-white py-1 shadow-xl"
              >
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <Link
                      href={cat.link}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#222] transition-all duration-200 hover:bg-gray-light hover:text-prim"
                    >
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Liens de navigation principaux */}
        <ul className="flex items-center">
          <li>
            <Link
              href="/"
              className="block px-4 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black/10"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/UI-Components/Pages/Shop"
              className="block px-4 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black/10"
            >
              Boutique
            </Link>
          </li>
          <li>
            <Link
              href="/UI-Components/Pages/Blogs"
              className="block px-4 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black/10"
            >
              Blogs
            </Link>
          </li>

          {/* Menu Pages avec dropdown */}
          <li className="relative">
            <button
              type="button"
              onClick={() => setPagesOpen((prev) => !prev)}
              className="flex items-center gap-1 px-4 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black/10"
              aria-expanded={pagesOpen}
              aria-controls="nav-pages"
            >
              Pages
              <Icon
                icon="solar:alt-arrow-down-outline"
                width="16"
                height="16"
                className={`transition-transform duration-300 ${pagesOpen ? "" : "rotate-180"}`}
              />
            </button>

            {pagesOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setPagesOpen(false)}
                />
                <ul
                  id="nav-pages"
                  className="absolute left-0 top-full z-20 min-w-48 overflow-hidden rounded-b-xl bg-white py-1 shadow-xl"
                >
                  {pages.map((page) => (
                    <li key={page.name}>
                      <Link
                        href={page.link}
                        onClick={() => setPagesOpen(false)}
                        className="block px-4 py-3 text-sm font-medium text-[#222] transition-all duration-200 hover:bg-gray-light hover:text-prim"
                      >
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        </ul>

        {/* Boutons d'action à droite */}
        <div className="ml-auto mr-3 flex items-center gap-2">
          <Link
            href="/UI-Components/Pages/Shop"
            className="flex items-center gap-2 rounded-md border border-secondary-dark bg-secondary px-4 py-2 text-sm font-semibold text-[#222] transition-all duration-300 hover:bg-secondary-dark hover:text-black"
          >
            <Icon icon="solar:bookmark-linear" width="16" height="16" />
            Les offres du jour
          </Link>
          <Link
            href="/UI-Components/Pages/Shop"
            className="flex items-center gap-2 rounded-md border border-white/70 bg-white px-4 py-2 text-sm font-semibold text-[#222] transition-all duration-300 hover:bg-gray-light hover:text-prim"
          >
            <Icon icon="lucide:tag" width="16" height="16" />
            Prix spéciaux
          </Link>
        </div>
      </div>
    </nav>
  );
}
