"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type OrganicProduct = {
  image: string;
  title: string;
  discount: string;
  description: string;
};

const organicProducts: OrganicProduct[] = [
  {
    image: "/freshbite-ctg-01.webp",
    title: "Légumineuses",
    discount: "20 % de réduction minimum",
    description: "Faites des économies",
  },
  {
    image: "/freshbite-ctg-02.webp",
    title: "Légumes frais",
    discount: "15 % de réduction minimum",
    description: "Des produits frais et sains",
  },
  {
    image: "/freshbite-ctg-03.webp",
    title: "Fruits biologiques",
    discount: "25 % de réduction minimum",
    description: "Des fruits frais de la ferme",
  },
  {
    image: "/freshbite-ctg-04.webp",
    title: "Produits de boulangerie",
    discount: "10 % de réduction minimum",
    description: "Fraîchement préparés",
  },
  {
    image: "/freshbite-ctg-05.webp",
    title: "Produits laitiers",
    discount: "20 % de réduction minimum",
    description: "Des produits frais et naturels",
  },
  {
    image: "/freshbite-ctg-06.webp",
    title: "En-cas et chips",
    discount: "30 % de réduction minimum",
    description: "Des en-cas croustillants",
  },
];

export default function OrganicPorducts() {
  return (
    <section className="relative bg-gray-light bg-[url('/freshbite-cat-bg.webp')] bg-contain bg-no-repeat px-2 py-8 sm:py-16 lg:px-8 xl:px-12">
      <div className="section-title flex flex-wrap gap-3 pb-5">
        <h2 className="text-3xl font-bold md:text-5xl">
          Nos produits par catégorie
        </h2>
        <p className="flex flex-wrap items-center gap-4 text-lg font-medium text-black/50 md:text-xl">
          <Image
            src="/freshbite-title-icon2.webp"
            alt=""
            width={31}
            height={38}
          />
          Faites le plein de bons produits, rayon après rayon.
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 8 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 12 },
          1280: { slidesPerView: 5, spaceBetween: 12 },
        }}
        loop
        speed={1000}
        className="w-full"
      >
        {organicProducts.map((product) => (
          <SwiperSlide key={product.title}>
            <article className="mx-auto flex h-full w-full flex-col items-center justify-center gap-5 rounded-md bg-white px-4 py-6 text-center shadow-lg">
              <Image
                src={product.image}
                alt={product.title}
                width={112}
                height={112}
                className="h-30 w-30 shrink-0 rounded-full object-cover"
              />
              <div className="text-center">
                <span className="rounded-sm bg-red-600 px-2 py-1 text-xs font-medium uppercase text-white">
                  {product.discount}
                </span>
                <div className="pt-2">
                  <h3 className="text-lg font-medium">{product.title}</h3>
                  <p className="text-sm text-gray-400">{product.description}</p>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
