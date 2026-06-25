"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const [pagesOpen, setPagesOpen] = useState(false);
  const linkBaseClass =
    "block p-4 font-medium text-md border-b border-b-gray-100 transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim";

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-screen w-64 overflow-y-auto bg-white shadow-md transition-transform duration-400 ease-out will-change-transform sm:w-[80%] md:w-[60%] lg:w-[50%] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className=" uppercase text-md font-medium bg-gray-light flex items-center justify-between p-4">
          Menu
          <button type="button" onClick={onClose} aria-label="Fermer le menu">
            <Icon icon="material-symbols-light:close" width="24" height="24" />
          </button>
        </div>
        <ul>
          <li>
            <Link
              href="/"
              onClick={onClose}
              className={linkBaseClass}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/UI-Components/Pages/Shop"
              onClick={onClose}
              className={linkBaseClass}
            >
              Boutique
            </Link>
          </li>
          <li>
            <Link
              href="/UI-Components/Pages/Blogs"
              onClick={onClose}
              className={linkBaseClass}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/UI-Components/Pages/Contact"
              onClick={onClose}
              className={linkBaseClass}
            >
              Contact
            </Link>
          </li>
          <li className=" border-b border-b-gray-100">
            <button
              type="button"
              onClick={() => setPagesOpen((prev) => !prev)}
              className="flex w-full items-center justify-between p-4 text-lg transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim"
              aria-expanded={pagesOpen}
              aria-controls="sidebar-pages"
            >
              <span className="text-md">Pages</span>
              <Icon
                icon={
                  pagesOpen
                    ? "solar:alt-arrow-up-outline"
                    : "solar:alt-arrow-down-outline"
                }
                width="24"
                height="24"
                className={`transition-transform duration-300 ${pagesOpen ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            <ul
              id="sidebar-pages"
              className={`overflow-hidden border-t border-t-gray-100 bg-[#fafafa] transition-all duration-300 ease-out ${
                pagesOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
                <li>
                  <Link
                    href="/UI-Components/Pages/About"
                    onClick={onClose}
                    className="block p-3 pl-8 text-sm transition-all duration-300 hover:bg-white hover:text-prim"
                  >
                    A propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UI-Components/Pages/Faqs"
                    onClick={onClose}
                    className="block p-3 pl-8 text-sm transition-all duration-300 hover:bg-white hover:text-prim"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UI-Components/Pages/Contact"
                    onClick={onClose}
                    className="block p-3 pl-8 text-sm transition-all duration-300 hover:bg-white hover:text-prim"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/UI-Components/Pages/PageNotFound"
                    onClick={onClose}
                    className="block p-3 pl-8 text-sm transition-all duration-300 hover:bg-white hover:text-prim"
                  >
                    Page non trouvée
                  </Link>
                </li>
              </ul>
          </li>
        </ul>
        <span className="uppercase font-medium text-md bg-gray-light flex items-center justify-between p-4">
          Acheter par catégories
        </span>
        <ul>
          <li>
            <Link
              href="/UI-Components/Pages/Shop"
              onClick={onClose}
              className="block border-b p-4 text-ms font-medium transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim"
            >
              Le lait et les produits laitiers
            </Link>
          </li>
           <li>
            <Link
              href="/UI-Components/Pages/Shop"
              onClick={onClose}
              className="block border-b p-4 text-ms font-medium transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim"
            >
              Les legumes et les fruits
            </Link>
          </li>
           <li>
            <Link
              href="/UI-Components/Pages/Shop"
              onClick={onClose}
              className="block border-b p-4 text-ms font-medium transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim"
            >
              Le petit-déjeuner et les céréales
            </Link>
          </li>
           <li>
            <Link
              href="/UI-Components/Pages/Shop"
              onClick={onClose}
              className="block border-b p-4 text-ms font-medium transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim"
            >
              Les biscuits et produits pour animaux
            </Link>
          </li>
           <li>
            <Link
              href="/UI-Components/Pages/Shop"
              onClick={onClose}
              className="block border-b p-4 text-ms font-medium transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim"
            >
              Le pain, les biscottes et les biscuits
            </Link>
          </li>
           <li>
            <Link
              href="/UI-Components/Pages/Shop"
              onClick={onClose}
              className="block border-b p-4 text-ms font-medium transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim"
            >
              Le poulet, la viande et le poisson
            </Link>
          </li>
           <li>
            <Link
              href="/UI-Components/Pages/Shop"
              onClick={onClose}
              className="block border-b p-4 text-ms font-medium transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim"
            >
              Les vitamines et les minéraux
            </Link>
          </li>
           <li>
            <Link
              href="/UI-Components/Pages/Shop"
              onClick={onClose}
              className="block border-b p-4 text-ms font-medium transition-all duration-300 ease-out hover:bg-gray-light/70 hover:text-prim"
            >
              La crème glacée et les boissons fraîches
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
