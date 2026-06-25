import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Navtop() {
  const mobileItems = (
    <>
      <span className="shrink-0">Livraison le lendemain de 10h00 à 23h00</span>

      <ul className="shrink-0">
        <li className="flex items-center gap-2">
          <Icon icon="famicons:call-outline" width={24} height={24} />
          <span>
            Besoin d'aide ? :
            <Link href="/UI-Components/Pages/Contact">+225 0757985147</Link>
          </span>
        </li>
      </ul>

      <ul className="flex shrink-0 gap-3">
        <li>
          <link href="/UI-Components/Pages/Contact" />
          Contact
        </li>
        <li>
          <link href="/UI-Components/Pages/Blogs" />
          Blog
        </li>
        <li>
          <link href="/UI-Components/Pages/Contact" />
          suivi de commandes
        </li>
      </ul>
    </>
  );

  return (
    <>
      <div className="hidden bg-gray-light items-center justify-between px-2 py-4 lg:flex lg:px-8 xl:px-12">
        <span>Livraison le lendemain de 10h00 à 23h00</span>

        <ul>
          <li className="flex items-center gap-2">
            <Icon icon="famicons:call-outline" width={24} height={24} />
            <span>
              Besoin d'aide ? :
              <Link href="/UI-Components/Pages/Contact">+225 0757985147</Link>
            </span>
          </li>
        </ul>
        <ul className="flex gap-3">
          <li>
            <link href="/UI-Components/Pages/Contact" />
            Contact
          </li>
          <li>
            <link href="/UI-Components/Pages/Blogs" />
            Blog
          </li>
          <li>
            <link href="/UI-Components/Pages/Contact" />
            suivi de commandes
          </li>
        </ul>
      </div>

      <div className="bg-gray-light px-2 py-3 overflow-hidden lg:hidden">
        <div className="navtop-marquee-track inline-flex min-w-max items-center whitespace-nowrap">
          <div className="flex shrink-0 items-center gap-10 pr-10">{mobileItems}</div>
          <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
            {mobileItems}
          </div>
        </div>
      </div>
    </>
  );
}
