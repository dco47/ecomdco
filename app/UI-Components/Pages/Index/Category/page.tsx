"use client";

import Image from "next/image";
import { StaticImageData } from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import ctg1 from "@/public/freshbite-cat1.png";
import ctg2 from "@/public/freshbite-cat2.png";
import ctg3 from "@/public/freshbite-cat3.png";
import ctg4 from "@/public/freshbite-cat4.png";
import ctg5 from "@/public/freshbite-cat5.png";
import ctg6 from "@/public/freshbite-cat6.png";
import ctg7 from "@/public/freshbite-cat7.png";
import ctg8 from "@/public/freshbite-cat8.png";

import titleicon from "@/public/freshbite-title-icon1.png";

type CategoryType = {
  image: StaticImageData;
  title: string;
};

const categories: CategoryType[] = [
  { image: ctg1, title: "Le lait et les produits laitiers" },
  { image: ctg2, title: "Les fruits et légumes" },
  { image: ctg3, title: "petit-déjeuner et les céréales" },
  { image: ctg4, title: "produits pour animaux" },
  { image: ctg5, title: "Les boissons et jus" },
  { image: ctg6, title: "Les viandes et poissons" },
  { image: ctg7, title: "Les produits surgelés" },
  { image: ctg8, title: "Les produits de boulangerie" },
];

export default function Category() {
  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 pt-20 pb-10">
        {/* Section Title */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start mb-12 gap-2 lg:gap-8">
          <div className="flex items-center justify-start gap-2">
            <h2 className="text-2xl lg:text-4xl font-bold">Nos Catégories</h2>
            <Image
              src={titleicon}
              alt="Title Icon"
              className="w-6 h-6 lg:w-8 lg:h-8"
            />
          </div>
          <p className="text-sm lg:text-base text-gray-600 text-left max-w-md">
            Bien manger commence au supermarché.
          </p>
        </div>

        {/* Categories Carousel */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 25 },
          }}
          className="w-full"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-light rounded-lg p-4 flex flex-col items-center justify-center h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="relative mb-4 grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-black/5 lg:h-20 lg:w-20">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 1024px) 64px, 80px"
                    className="object-contain object-center p-2"
                  />
                </div>
                <h3 className="text-center text-sm lg:text-base font-semibold text-gray-900 transition-colors duration-300 group-hover:text-prim line-clamp-2">
                  {category.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
