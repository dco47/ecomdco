import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const commitments = [
  {
    icon: "solar:leaf-linear",
    title: "Des produits pour le quotidien",
    description:
      "Fruits, légumes et essentiels : retrouvez une sélection variée pour composer vos achats au même endroit.",
  },
  {
    icon: "solar:cart-large-2-linear",
    title: "Des achats plus simples",
    description:
      "Parcourez les produits, choisissez vos formats et préparez votre panier en quelques étapes.",
  },
  {
    icon: "solar:delivery-linear",
    title: "Un service à votre écoute",
    description:
      "Notre équipe vous accompagne pour vos questions sur les produits, les commandes et la livraison.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-prim-dark">
            À propos de DcoShop
          </p>
          <h1 className="mt-4 font-unbounded text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Le frais et le quotidien, en toute simplicité.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
            DcoShop est une boutique en ligne pensée pour vous aider à retrouver
            des produits du quotidien et à préparer vos achats facilement,
            depuis chez vous.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600">
            Notre catalogue rassemble notamment des fruits, des légumes et
            d’autres essentiels. Choisissez vos produits, ajoutez-les au panier
            et contactez notre équipe pour toute question sur votre commande.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/UI-Components/Pages/Shop"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-prim px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-prim-dark"
            >
              Découvrir la boutique
              <Icon icon="solar:arrow-right-linear" width="18" height="18" />
            </Link>
            <Link
              href="/UI-Components/Pages/Contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-prim hover:text-prim-dark"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-xl justify-center">
          <div className="absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-2xl bg-secondary/60" />
          <div className="relative aspect-[3/5] w-full max-w-95 overflow-hidden rounded-2xl bg-gray-light">
            <Image
              src="/ph-pro.jpeg"
              alt="Le fondateur de DcoShop"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 380px"
              className="object-contain object-center"
            />
          </div>
          <div className="absolute -right-2 bottom-5 max-w-55 rounded-xl bg-white p-4 shadow-lg sm:-right-5 sm:bottom-8">
            <p className="font-unbounded text-sm font-semibold text-gray-900">
              DcoShop
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-600">
              Votre boutique en ligne pour les produits frais et du quotidien.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-light px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prim-dark">
              Notre engagement
            </p>
            <h2 className="mt-3 font-unbounded text-2xl font-semibold text-gray-900 sm:text-3xl">
              Une expérience pensée pour vous
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              Nous voulons rendre la découverte et l’achat de vos produits
              simples, clairs et agréables.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {commitments.map((commitment) => (
              <article
                key={commitment.title}
                className="rounded-xl border border-gray-200 bg-white p-6 sm:p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-prim/10 text-prim-dark">
                  <Icon
                    icon={commitment.icon}
                    width="24"
                    height="24"
                    aria-hidden="true"
                  />
                </span>
                <h3 className="mt-5 font-unbounded text-base font-semibold text-gray-900">
                  {commitment.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {commitment.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:px-8 sm:py-16 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <h2 className="font-unbounded text-xl font-semibold text-gray-900 sm:text-2xl">
            Une question ? Parlons-en.
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Notre équipe est disponible pour vous renseigner sur vos achats.
          </p>
        </div>
        <a
          href="https://wa.me/2250757985147"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-secondary-dark"
        >
          <Icon icon="ic:baseline-whatsapp" width="20" height="20" />
          Écrire à DcoShop
        </a>
      </section>
    </main>
  );
}
