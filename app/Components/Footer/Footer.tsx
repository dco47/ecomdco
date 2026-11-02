import { Icon } from "@iconify/react";
import Link from "next/link";

const shopLinks = [
  { label: "Boutique", href: "/UI-Components/Pages/Shop" },
  { label: "Nos offres", href: "/UI-Components/Pages/Shop" },
  { label: "Nos favoris", href: "/UI-Components/Pages/Wishlist" },
  { label: "Notre histoire", href: "/UI-Components/Pages/About" },
];

const helpLinks = [
  { label: "Nous contacter", href: "/UI-Components/Pages/Contact" },
  { label: "Questions fréquentes", href: "/UI-Components/Pages/Faqs" },
  { label: "Suivre une commande", href: "/UI-Components/Pages/Contact" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-white text-gray-700">
      <div className="absolute inset-0 -z-10 bg-[url('/freshbite-footer-bg.webp')] bg-bottom bg-no-repeat opacity-60" />

      <div className="border-y border-gray-200/80 bg-white/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-unbounded text-lg font-semibold text-prim-dark sm:text-xl">
              Le meilleur du frais, simplement.
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Découvrez nos produits et profitez de nos offres de la semaine.
            </p>
          </div>
          <Link
            href="/UI-Components/Pages/Shop"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-prim px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-prim-dark"
          >
            Découvrir la boutique
            <Icon icon="solar:arrow-right-linear" width="18" height="18" />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12 lg:px-8 lg:py-16">
        <div>
          <Link
            href="/"
            className="font-unbounded text-2xl font-bold text-gray-900"
            aria-label="DcoShop, accueil"
          >
            Dco<span className="text-prim">Shop</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600">
            Votre boutique en ligne de produits frais et du quotidien. Faites
            vos achats en toute simplicité et recevez votre commande chez vous.
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon
              icon="solar:delivery-linear"
              width="20"
              height="20"
              className="text-prim-dark"
            />
            Livraison le lendemain, de 10 h à 23 h
          </div>
        </div>

        <nav aria-label="Navigation de la boutique">
          <h2 className="font-unbounded text-sm font-semibold text-gray-900">
            La boutique
          </h2>
          <ul className="mt-4 space-y-3">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 transition-colors hover:text-prim-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Aide et informations">
          <h2 className="font-unbounded text-sm font-semibold text-gray-900">
            Besoin d’aide ?
          </h2>
          <ul className="mt-4 space-y-3">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 transition-colors hover:text-prim-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-unbounded text-sm font-semibold text-gray-900">
            Contactez-nous
          </h2>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            Notre équipe est là pour vous accompagner dans vos achats.
          </p>
          <a
            href="tel:+2250757985147"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-800 transition-colors hover:text-prim-dark"
          >
            <Icon
              icon="solar:phone-linear"
              width="19"
              height="19"
              className="text-prim-dark"
            />
            +225 07 57 98 51 47
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} DcoShop. Tous droits réservés.</p>
          <p>Des produits frais, près de chez vous.</p>
        </div>
      </div>
    </footer>
  );
}
