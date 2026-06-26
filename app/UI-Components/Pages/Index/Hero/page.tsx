"use client";

import slidebanner1 from "@/public/freshbite-slidebanner1.png";
import slidebanner2 from "@/public/freshbite-slidebanner2.png";
import slidebanner3 from "@/public/freshbite-slidebanner3.png";

import { Icon } from "@iconify/react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const slides = [
    {
      img: slidebanner1.src,
      title: "graine Bio",
      subtitle: "produits 100% BIO.",
    },
    {
      img: slidebanner2.src,
      title: "produits frais",
      subtitle: "produits 100% frais.",
    },
    {
      img: slidebanner3.src,
      title: "produits de qualité",
      subtitle: "produits 100% de qualité.",
    },
  ];

  return (
    <>
      <div className="hero px-2 lg:px-8 xl:px-12 py-[1%] flex justify-between items-stretch lg:flex-row flex-col gap-3 lg:gap-6 w-full h-200 lg:h-125 xl:h-150 xxl:h-175">
        <div className="w-full lg:w-[30%] h-full bg-[url('/freshbite-banner1.png')] bg-cover bg-center rounded-lg flex justify-center items-start gap-3 overflow-hidden relative">
          <div className="content h-full pt-20 z-1">
            <h3 className="text-white text-4xl font-medium mb-3 text-center">
              produits de <br /> Boulangerie
            </h3>
            <Link
              href="/UI-Components/Pages/Shop"
              className="bg-prim text-white hover:bg-black transition-colors duration-300 px-4 py-2 rounded-md flex items-center cursor-pointer text-md font-bold uppercase h-fit mx-auto"
            >
              Acheter maintenant
              <Icon
                icon="lucide:shopping-bag"
                width="18"
                className="ms-1 text-white"
              />
            </Link>
          </div>
          <div className="absolute bg-black/10 top-0 left-0 h-full w-full"></div>
        </div>
        <div className="w-full lg:w-[40%] h-full relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={1000}
            pagination={{ clickable: true }}
            className="h-full w-full relative"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="flex h-full items-start justify-center rounded-md bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.img})` }}
                >
                  <div className="content z-1 h-full pt-20 text-center">
                    <span className="underline text-sm xl:text-xl uppercase font-bold block mb-2">
                      {slide.title}
                    </span>
                    <h3 className="text-white text-2xl xl:text-4xl font-bold mb-4">
                      {slide.title.split(" ")[0]} {slide.title.split(" ")[1]}
                    </h3>
                    <Link
                      href="/UI-Components/Pages/Shop"
                      className="bg-white hover:bg-black hover:text-white transition-all duration-300 px-4 py-2 rounded-md inline-flex items-center font-bold uppercase"
                    >
                      Acheter maintenant
                      <Icon
                        icon="lucide:shopping-bag"
                        width="18"
                        className="ms-1 text-current"
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

       <div className="w-full lg:w-[30%] h-full bg-[url('/freshbite-banner2.png')] bg-cover bg-center rounded-lg flex justify-center items-start gap-3 overflow-hidden relative">
          <div className="content h-full pt-20 z-1">
            <h3 className="text-white text-4xl font-medium mb-3 text-center">
              frais <br /> Legumes
            </h3>
            <Link
              href="/UI-Components/Pages/Shop"
              className="bg-prim text-white hover:bg-black transition-colors duration-300 px-4 py-2 rounded-md flex items-center cursor-pointer text-md font-bold uppercase h-fit mx-auto"
            >
              Acheter maintenant
              <Icon
                icon="lucide:shopping-bag"
                width="18"
                className="ms-1 text-white"
              />
            </Link>
          </div>
          <div className="absolute bg-black/10 top-0 left-0 h-full w-full"></div>
        </div>
      </div>
    </>
  );
}
