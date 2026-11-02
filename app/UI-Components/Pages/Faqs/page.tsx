import { Icon } from "@iconify/react";
import Link from "next/link";

const faqSections = [
  {
    id: "commandes",
    title: "Commandes",
    icon: "solar:cart-large-2-linear",
    questions: [
      {
        question: "Comment passer une commande ?",
        answer:
          "Parcourez la boutique, choisissez vos produits et ajoutez-les au panier. Pour connaître les modalités de commande et confirmer votre achat, contactez-nous par téléphone ou sur WhatsApp.",
      },
      {
        question: "Comment modifier ou annuler une commande ?",
        answer:
          "Contactez-nous dès que possible au +225 07 57 98 51 47. Indiquez votre nom et les détails de votre demande afin que nous puissions vérifier si une modification est encore possible.",
      },
      {
        question: "Où puis-je suivre ma commande ?",
        answer:
          "Le suivi en ligne n’est pas encore disponible. Pour obtenir des nouvelles de votre commande, appelez-nous ou écrivez-nous sur WhatsApp.",
      },
    ],
  },
  {
    id: "livraison",
    title: "Livraison",
    icon: "solar:delivery-linear",
    questions: [
      {
        question: "Quels sont les horaires de livraison annoncés ?",
        answer:
          "La livraison est annoncée le lendemain, entre 10 h et 23 h. Contactez-nous pour confirmer le délai applicable à votre commande.",
      },
      {
        question: "Livrez-vous dans mon quartier ?",
        answer:
          "Les zones desservies ne sont pas encore détaillées sur le site. Envoyez-nous votre quartier sur WhatsApp ou appelez-nous pour vérifier la disponibilité.",
      },
      {
        question: "Quels sont les frais de livraison ?",
        answer:
          "Les frais ne sont pas indiqués sur le site pour le moment. Nous vous les confirmerons avant la validation de votre commande.",
      },
    ],
  },
  {
    id: "produits-paiement",
    title: "Produits et paiement",
    icon: "solar:leaf-linear",
    questions: [
      {
        question: "Les prix affichés sont-ils en francs CFA ?",
        answer:
          "Oui. Les prix du catalogue sont affichés en FCFA. Si vous avez un doute sur un produit ou son format, contactez-nous avant de commander.",
      },
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer:
          "Au moment de la commande, vous pouvez indiquer votre préférence pour Mobile Money ou le paiement en espèces à la livraison. Notre équipe confirmera les modalités sur WhatsApp. Aucun paiement n’est débité directement sur le site.",
      },
      {
        question: "Que faire si un produit est indisponible ou ne convient pas ?",
        answer:
          "Contactez-nous en précisant le produit concerné et votre demande. Nous vous aiderons à vérifier sa disponibilité et les solutions possibles.",
      },
    ],
  },
];

export default function FaqsPage() {
  return (
    <main className="bg-white">
      <header className="bg-gray-light">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-prim-dark">
            Centre d’aide DcoShop
          </p>
          <h1 className="mt-3 font-unbounded text-3xl font-semibold text-gray-900 sm:text-5xl">
            Questions fréquentes
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Retrouvez les réponses aux questions les plus courantes sur les
            commandes, la livraison et les produits.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14 lg:px-12">
        <div className="space-y-10">
          {faqSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-8"
            >
              <h2
                id={`${section.id}-title`}
                className="mb-4 flex items-center gap-3 font-unbounded text-lg font-semibold text-gray-900 sm:text-xl"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-prim/10 text-prim-dark">
                  <Icon icon={section.icon} width="21" height="21" />
                </span>
                {section.title}
              </h2>

              <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 px-4 sm:px-6">
                {section.questions.map((item) => (
                  <details key={item.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 text-left text-sm font-semibold text-gray-900 marker:hidden sm:text-base [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <Icon
                        icon="solar:alt-arrow-down-linear"
                        width="20"
                        height="20"
                        className="shrink-0 text-prim-dark transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="max-w-3xl pt-3 pr-7 text-sm leading-6 text-gray-600">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="h-fit rounded-2xl bg-gray-light p-6 sm:p-8 lg:sticky lg:top-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-prim-dark shadow-sm">
            <Icon icon="solar:chat-round-dots-linear" width="24" height="24" />
          </span>
          <h2 className="mt-5 font-unbounded text-lg font-semibold text-gray-900">
            Vous avez encore une question ?
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Notre équipe peut vous renseigner sur votre commande, les produits
            et les modalités de livraison.
          </p>

          <div className="mt-6 space-y-3">
            <a
              href="tel:+2250757985147"
              className="flex items-center gap-2 text-sm font-semibold text-gray-800 transition-colors hover:text-prim-dark"
            >
              <Icon
                icon="solar:phone-linear"
                width="18"
                height="18"
                className="text-prim-dark"
              />
              +225 07 57 98 51 47
            </a>
            <a
              href="https://wa.me/2250757985147"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-gray-800 transition-colors hover:text-prim-dark"
            >
              <Icon
                icon="ic:baseline-whatsapp"
                width="18"
                height="18"
                className="text-green-600"
              />
              Nous écrire sur WhatsApp
            </a>
          </div>

          <Link
            href="/UI-Components/Pages/Contact"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-prim px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-prim-dark"
          >
            Voir tous les contacts
            <Icon icon="solar:arrow-right-linear" width="18" height="18" />
          </Link>
        </aside>
      </div>
    </main>
  );
}
