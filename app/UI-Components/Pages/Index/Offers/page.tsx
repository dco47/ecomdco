import Image from "next/image";
import Link from "next/link";

const offers = [
  {
    image: "/banneroffers-01.webp",
    discount: "29 % DE RÉDUCTION",
    title: "Calamars de la mer",
    alt: "Assiette de calamars grillés",
  },
  {
    image: "/banneroffers-02.webp",
    discount: "49 % DE RÉDUCTION",
    title: "Pains fraîchement cuits",
    alt: "Pains fraîchement cuits",
  },
  {
    image: "/banneroffers-03.webp",
    discount: "49 % DE RÉDUCTION",
    title: "Fruits et légumes",
    alt: "Salade de fruits et légumes frais",
  },
];

export default function Offers() {
  return (
    <section className="w-full bg-gray-light px-4 py-10 lg:px-8 lg:py-14">
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {offers.map((offer) => (
          <article
            key={offer.title}
            className="relative aspect-7/4 w-full overflow-hidden rounded-lg"
          >
            <Image
              src={offer.image}
              alt={offer.alt}
              fill
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />

            <div className="absolute inset-y-0 left-0 flex w-[58%] flex-col items-start justify-center pl-5 text-white sm:pl-7 lg:pl-10">
              <p className="mb-2 text-[10px] font-semibold uppercase underline underline-offset-2 sm:text-xs lg:text-sm">
                {offer.discount}
              </p>
              <h2 className="mb-4 text-xl font-semibold leading-[1.05] sm:text-2xl lg:text-3xl">
                {offer.title}
              </h2>
              <Link
                href="/UI-Components/Pages/Shop"
                className="inline-flex items-center gap-2 rounded-sm bg-secondary px-4 py-2 text-xs font-medium text-gray-900 transition-colors hover:bg-white sm:text-sm"
              >
                Voir l’offre
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
