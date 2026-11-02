import BannerOffers from "./BannerOffers/page";
import Category from "./Category/page";
import Hero from "./Hero/page";
import Offers from "./Offers/page";
import OrganicPorducts from "./OrganicPorducts/page";
import TopSelling from "./TopSelling/page";


export default function Index() {
  return (
    <>
      <Hero />
      <Category />
      <TopSelling />
      <BannerOffers/>
      <OrganicPorducts/>
      <Offers/>
    </>
  )
}
