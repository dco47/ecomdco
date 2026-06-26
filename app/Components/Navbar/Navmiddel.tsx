"use client";

import Link from "next/link";
import { useState, useEffect, type FormEvent } from "react";
import { Icon } from "@iconify/react";
import Sidebar from "./Sidebar";

export default function Navmiddel() {
  // Etats UI principaux de la barre de navigation.
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  // Champs du formulaire de connexion affiché dans la popup compte.
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Synchronise le compteur wishlist avec le contenu stocké dans le navigateur.
  useEffect(() => {
    const updateWishlistCount = () => {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(stored.length);
    };

    updateWishlistCount();
    window.addEventListener("wishlist-updated", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlist-updated", updateWishlistCount);
    };
  }, []);

  // Synchronise le compteur panier avec le contenu stocké dans le navigateur.
  useEffect(() => {
    const updateCartCount = () => {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(stored.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // Ouvre la popup compte et ferme le menu mobile si besoin.
  const openAccountModal = () => {
    setShowModal(true);
    setIsSignupMode(false);
    setOpenMenu(false);
  };

  // Ferme la popup compte et revient sur la vue connexion par defaut.
  const closeAccountModal = () => {
    setShowModal(false);
    setIsSignupMode(false);
  };

  // Intercepte la soumission recherche et diffuse la valeur via un event custom.
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent("navbar-search", {
        detail: searchTerm.trim(),
      })
    );
  };

  // Soumet les identifiants saisis vers un event custom d'authentification.
  const handleAccountSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent("account-login-submit", {
        detail: {
          email: accountEmail.trim(),
          password: accountPassword,
        },
      })
    );
  };

  // Soumet les donnees du formulaire d'inscription vers un event custom.
  const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent("account-register-submit", {
        detail: {
          fullName: signupName.trim(),
          email: signupEmail.trim(),
          password: signupPassword,
        },
      })
    );
  };

  return (
    <>
      {/* Barre principale: menu mobile, logo, recherche desktop, actions compte/wishlist/panier */}
      <div className="relative flex items-center justify-between px-2 py-3 lg:px-8 xl:px-12">
        <button
          type="button"
          onClick={() => setOpenMenu((prevState) => !prevState)}
          className="flex lg:hidden cursor-pointer"
          aria-label="Ouvrir le menu"
          aria-expanded={openMenu}
        >
          <Icon icon="material-symbols-light:menu" width="30" height="30" />
        </button>
        <Link href="/" className="logo font-unbounded text-xl sm:text-2xl cursor-pointer">
          Ecom<span className="text-prim">Dco</span>
        </Link>

        {/* Actions rapides en mobile (wishlist et panier). */}
        <div className="flex items-center gap-2 lg:hidden relative">
          <Link
            href="/UI-Components/Pages/Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-light cursor-pointer"
            aria-label="Favoris"
          >
            <Icon icon="tabler:heart" width="22" height="22" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-prim font-unbounded text-[10px] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/UI-Components/Pages/Cart"
            onClick={() => setOpenMenu(false)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-light"
            aria-label="Panier"
          >
            <Icon icon="lucide:shopping-bag" width="22" height="22" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-prim font-unbounded text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Recherche visible uniquement en desktop/tablette large. */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden w-full max-w-xl items-center overflow-hidden rounded-sm border border-gray-200 bg-white lg:flex"
        >
          <span className="ps-4 text-gray-500">
            <Icon icon="iconamoon:search-thin" width="20" height="20" />
          </span>
          <input
            type="text"
            placeholder="Rechercher vos produits..."
            className="flex-1 px-3 py-3 text-[16px] text-[#222] border-0 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-prim text-white hover:bg-black transition-colors duration-300 px-6 py-3 font-semibold text-sm uppercase me-1 my-1 rounded-sm cursor-pointer"
          >
            Rechercher...
          </button>
        </form>

        {/* Actions desktop: compte, wishlist et panier avec badges. */}
        <ul className="hidden items-center justify-end space-x-3 lg:flex lg:space-x-5 relative">
          <li>
            <button
              type="button"
              onClick={openAccountModal}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gray-light"
              aria-label="Compte"
            >
              <Icon icon="lucide:user" width="24" height="24" />
            </button>
          </li>

          <li className="relative">
            <Link
              href="/UI-Components/Pages/Wishlist"
              className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gray-light"
              aria-label="Favoris"
            >
              <Icon icon="tabler:heart" width="24" height="24" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-prim font-unbounded text-sm text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link
              href="/UI-Components/Pages/Cart"
              className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gray-light"
              aria-label="Panier"
            >
              <Icon icon="lucide:shopping-bag" width="24" height="24" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-prim font-unbounded text-sm text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      <Sidebar open={openMenu} onClose={() => setOpenMenu(false)} />

      {/* Popup compte utilisateur avec formulaire de connexion. */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-130 rounded-3xl bg-white px-4 py-6 shadow-xl sm:rounded-[28px] sm:px-8 sm:py-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="clash-font text-xs font-semibold text-black sm:text-2xl lg:text-[2rem]">
                  {isSignupMode ? "Creez votre compte" : "Connectez-vous a votre compte"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeAccountModal}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:text-black cursor-pointer"
                aria-label="Fermer la fenêtre"
              >
                <Icon icon="lucide:x" width="28" height="28" />
              </button>
            </div>

            {isSignupMode ? (
              <form onSubmit={handleSignupSubmit} className="mt-6 sm:mt-8">
                <div className="space-y-4 sm:space-y-5">
                  <input
                    type="text"
                    value={signupName}
                    onChange={(event) => setSignupName(event.target.value)}
                    placeholder="Nom complet"
                    className="h-13 w-full rounded-xl bg-[#f2f5f7] px-4 text-base text-[#222] outline-none placeholder:text-[#7d868c] sm:h-15 sm:rounded-2xl sm:px-6 sm:text-lg"
                  />

                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(event) => setSignupEmail(event.target.value)}
                    placeholder="Adresse e-mail"
                    className="h-13 w-full rounded-xl bg-[#f2f5f7] px-4 text-base text-[#222] outline-none placeholder:text-[#7d868c] sm:h-15 sm:rounded-2xl sm:px-6 sm:text-lg"
                  />

                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(event) => setSignupPassword(event.target.value)}
                    placeholder="Mot de passe"
                    className="h-13 w-full rounded-xl bg-[#f2f5f7] px-4 text-base text-[#222] outline-none placeholder:text-[#7d868c] sm:h-15 sm:rounded-2xl sm:px-6 sm:text-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 flex h-13 w-full items-center justify-center rounded-xl bg-prim px-6 text-lg font-semibold text-white transition hover:bg-black sm:mt-7 sm:h-15 sm:rounded-2xl sm:text-xl cursor-pointer"
                >
                  Creer mon compte
                </button>

                <p className="mt-6 text-center text-base font-medium text-[#151515] sm:mt-7 sm:text-lg">
                  Vous avez deja un compte ?{" "}
                  <button
                    type="button"
                    className="font-semibold text-prim transition hover:underline hover:underline-offset-4 hover:decoration-black cursor-pointer"
                    onClick={() => setIsSignupMode(false)}
                  >
                    Connectez-vous
                  </button>
                </p>

                <p className="mx-auto mt-8 max-w-125 text-center text-base leading-7 text-[#5e5e5e] sm:mt-10 sm:text-lg sm:leading-8">
                  En vous connectant ou en creant un compte sur ecomdco, vous acceptez nos <span className="text-prim">Conditions d&apos;utilisation</span> et notre <span className="text-prim">Politique de confidentialite</span>.
                </p>
              </form>
            ) : (
              <form onSubmit={handleAccountSubmit} className="mt-6 sm:mt-8">
                <div className="space-y-4 sm:space-y-5">
                  <input
                    type="email"
                    value={accountEmail}
                    onChange={(event) => setAccountEmail(event.target.value)}
                    placeholder="Adresse e-mail"
                    className="h-13 w-full rounded-xl bg-[#f2f5f7] px-4 text-base text-[#222] outline-none placeholder:text-[#7d868c] sm:h-15 sm:rounded-2xl sm:px-6 sm:text-lg"
                  />

                  <input
                    type="password"
                    value={accountPassword}
                    onChange={(event) => setAccountPassword(event.target.value)}
                    placeholder="Mot de passe"
                    className="h-13 w-full rounded-xl bg-[#f2f5f7] px-4 text-base text-[#222] outline-none placeholder:text-[#7d868c] sm:h-15 sm:rounded-2xl sm:px-6 sm:text-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 flex h-13 w-full items-center justify-center rounded-xl bg-prim px-6 text-lg font-semibold text-white transition hover:bg-black sm:mt-7 sm:h-15 sm:rounded-2xl sm:text-xl cursor-pointer"
                >
                  Se connecter
                </button>

                <p className="mt-6 text-center text-base font-medium text-[#151515] sm:mt-7 sm:text-lg">
                  Vous n&apos;avez pas de compte ?{" "}
                  <button
                    type="button"
                    className="font-semibold text-prim transition hover:underline hover:underline-offset-4 hover:decoration-black cursor-pointer"
                    onClick={() => setIsSignupMode(true)}
                  >
                    Inscrivez-vous ici
                  </button>
                </p>

                <p className="mx-auto mt-8 max-w-125 text-center text-base leading-7 text-[#5e5e5e] sm:mt-10 sm:text-lg sm:leading-8">
                  En vous connectant ou en creant un compte sur ecomdco, vous acceptez nos <span className="text-prim">Conditions d&apos;utilisation</span> et notre <span className="text-prim">Politique de confidentialite</span>.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
