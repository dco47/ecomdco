"use client";

export default function BannerOffers() {
  return (
    <div className="grid grid-cols-1 items-center gap-2 px-2 py-12 sm:grid-cols-2 lg:px-8 lg:grid-cols-3 xl:grid-cols-5 xl:px-12">
      <div className="banner-item rounded-xl p-8 bg-prim-dark lg:p-10">
        <p className="text-2xl font-medium text-white">Les offres de la semaine</p>
        <a
          className="cursor-pointer text-md font-medium capitalize text-secondary"
        >
          Voir les offres
        </a>
      </div>
      <div className="banner-item rounded-xl p-8 bg-prim-dark lg:p-10">
        <p className="text-2xl font-medium text-white">Les plus grandes réductions</p>
        <a
          className="cursor-pointer text-md font-medium capitalize text-secondary"
        >
          Voir les offres
        </a>
      </div>
      <div className="banner-item rounded-xl p-8 bg-prim-dark lg:p-10">
        <p className="text-2xl font-medium text-white">Des assortiments à ne pas manquer</p>
        <a
          className="cursor-pointer text-md font-medium capitalize text-secondary"
        >
          Voir les offres
        </a>
      </div>
      <div className="banner-item rounded-xl p-8 bg-prim-dark lg:p-10">
        <p className="text-2xl font-medium text-white">Le coin à 11000 F CFA</p>
        <a
          className="cursor-pointer text-md font-medium capitalize text-secondary"
        >
          Voir les offres
        </a>
      </div>
      <div className="banner-item rounded-xl p-8 bg-prim-dark lg:p-10">
        <p className="text-2xl font-medium text-white">Offre à durée limitée</p>
        <a
          className="cursor-pointer text-md font-medium capitalize text-secondary"
        >
          Voir les offres
        </a>
      </div>
    </div>

    
  );
}
