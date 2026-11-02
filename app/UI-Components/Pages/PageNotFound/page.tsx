import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function PageNotFoundPage() {
  return (
    <main className="flex min-h-[65vh] items-center bg-gray-light px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-8 overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-2 md:gap-4">
        <div className="order-2 px-6 pb-8 sm:px-10 md:order-1 md:py-12 lg:px-14">
          <p className="font-unbounded text-sm font-semibold tracking-[0.2em] text-prim-dark">
            ERREUR 404
          </p>
          <h1 className="mt-4 font-unbounded text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Oups ! Cette page est introuvable.
          </h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-prim px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-prim-dark"
            >
              <Icon icon="solar:home-2-linear" width="18" height="18" />
              Retour à l’accueil
            </Link>
            <Link
              href="/UI-Components/Pages/Shop"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-prim hover:text-prim-dark"
            >
              Découvrir la boutique
              <Icon icon="solar:arrow-right-linear" width="18" height="18" />
            </Link>
          </div>
        </div>

        <div className="order-1 flex justify-center px-6 pt-8 md:order-2 md:px-8 md:py-10">
          <Image
            src="/pagenotfound.webp"
            alt="Illustration d’un parapluie ouvert"
            width={535}
            height={640}
            priority
            className="h-auto max-h-90 w-full max-w-75 object-contain sm:max-h-105 sm:max-w-87.5 md:max-h-120"
          />
        </div>
      </section>
    </main>
  );
}
