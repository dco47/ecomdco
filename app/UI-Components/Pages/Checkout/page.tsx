"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";

type CartItem = {
  id: string;
  title: string;
  image: string;
  price: string;
  size: string;
  quantity: number;
};

const whatsappNumber = "2250757985147";

type PaymentStatus = "idle" | "processing" | "success";

const parsePrice = (price: string) => Number(price.replace(/\s/g, ""));
const formatFcfa = (value: number) =>
  new Intl.NumberFormat("fr-FR").format(value);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.image === "string" &&
    typeof item.price === "string" &&
    Number.isFinite(parsePrice(item.price)) &&
    typeof item.size === "string" &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartError, setCartError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mobile-money");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentReference, setPaymentReference] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");

  useEffect(() => {
    const loadCart = () => {
      try {
        const stored = window.localStorage.getItem("cart");
        const parsed: unknown = stored ? JSON.parse(stored) : [];

        if (!Array.isArray(parsed) || !parsed.every(isCartItem)) {
          throw new Error("Le contenu enregistré dans le panier est invalide.");
        }

        setCartItems(parsed);
        setCartError("");
      } catch (error) {
        setCartItems([]);
        setCartError(
          error instanceof Error
            ? error.message
            : "Impossible de lire le panier enregistré.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + parsePrice(item.price) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      cartItems.length === 0 ||
      cartError ||
      paymentStatus !== "idle"
    ) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("name") ?? "").trim();
    const customerPhone = String(formData.get("phone") ?? "").trim();
    const customerEmail = String(formData.get("email") ?? "").trim();
    const deliveryAddress = String(formData.get("address") ?? "").trim();
    const deliveryDetails = String(formData.get("details") ?? "").trim();
    const paymentPhone = String(formData.get("paymentPhone") ?? "").trim();
    const paymentMethodLabel =
      paymentMethod === "mobile-money"
        ? "Mobile Money"
        : paymentMethod === "cash-on-delivery"
          ? "Espèces à la livraison"
          : "À convenir avec l’équipe";
    const selectedPaymentLabel =
      paymentMethod === "mobile-money" && paymentPhone
        ? `Mobile Money (${paymentPhone})`
        : paymentMethodLabel;
    const reference = `DS-${Date.now().toString(36).toUpperCase()}`;
    const orderLines = cartItems.map(
      (item) =>
        `- ${item.title} (${item.size}) x ${item.quantity} : ${formatFcfa(
          parsePrice(item.price) * item.quantity,
        )} FCFA`,
    );

    const whatsappMessage = [
      "Bonjour DcoShop, voici ma commande issue de la simulation :",
      "",
      ...orderLines,
      "",
      `Total des produits : ${formatFcfa(totalAmount)} FCFA`,
      "Frais et modalités de livraison : à confirmer avec l’équipe.",
      "",
      `Nom : ${customerName}`,
      `Téléphone : ${customerPhone}`,
      customerEmail ? `E-mail : ${customerEmail}` : "",
      `Adresse de livraison : ${deliveryAddress}`,
      deliveryDetails ? `Précisions : ${deliveryDetails}` : "",
      `Moyen de paiement choisi : ${selectedPaymentLabel}`,
      `Référence de simulation : ${reference}`,
      "Aucun paiement réel n’a été effectué. Merci de confirmer la commande et les modalités de paiement.",
    ]
      .filter(Boolean)
      .join("\n");

    setWhatsappMessage(whatsappMessage);
    setPaymentStatus("processing");
    window.setTimeout(() => {
      setPaymentReference(reference);
      setPaymentStatus("success");
    }, 900);
  };

  return (
    <main className="min-h-[65vh] bg-gray-light px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-prim-dark">
            DcoShop
          </p>
          <h1 className="mt-3 font-unbounded text-3xl font-semibold text-gray-900 sm:text-4xl">
            Finaliser la commande
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Renseignez vos coordonnées. La commande sera transmise à notre
            équipe via WhatsApp pour confirmation.
          </p>
        </header>

        {isLoading ? (
          <div
            className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600"
            role="status"
          >
            Chargement de votre panier…
          </div>
        ) : cartError ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-white p-6 text-sm text-red-700"
          >
            <p className="font-semibold">Impossible de charger votre panier.</p>
            <p className="mt-2">{cartError}</p>
            <Link
              href="/UI-Components/Pages/Cart"
              className="mt-4 inline-flex font-semibold underline underline-offset-2"
            >
              Retourner au panier
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-14 text-center">
            <Icon
              icon="solar:cart-large-2-linear"
              width="42"
              height="42"
              className="mx-auto text-gray-400"
            />
            <h2 className="mt-4 font-unbounded text-lg font-semibold text-gray-900">
              Votre panier est vide
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ajoutez des produits avant de passer commande.
            </p>
            <Link
              href="/UI-Components/Pages/Shop"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-prim px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-prim-dark"
            >
              Découvrir la boutique
              <Icon icon="solar:arrow-right-linear" width="18" height="18" />
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:gap-8">
            {paymentStatus === "success" ? (
              <section
                aria-live="polite"
                className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Icon
                    icon="solar:check-circle-linear"
                    width="28"
                    height="28"
                  />
                </span>
                <h2 className="mt-5 font-unbounded text-xl font-semibold text-gray-900">
                  Paiement terminée
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {paymentMethod === "mobile-money"
                    ? "Le paiement Mobile Money a été simulé avec succès."
                    : paymentMethod === "cash-on-delivery"
                      ? "La commande avec paiement à la livraison a été simulée."
                      : "La demande de commande a été simulée."}{" "}
                  Aucun paiement réel n’a été effectué.
                </p>
                <div className="mt-5 rounded-lg bg-gray-light p-4 text-sm">
                  <p className="text-gray-600">Montant simulé</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {formatFcfa(totalAmount)} FCFA
                  </p>
                  <p className="mt-3 text-gray-600">Référence de démonstration</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {paymentReference}
                  </p>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-prim px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-prim-dark"
                >
                  Envoyer la commande sur WhatsApp
                  <Icon icon="ic:baseline-whatsapp" width="20" height="20" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentStatus("idle");
                    setPaymentReference("");
                    setWhatsappMessage("");
                  }}
                  className="mt-4 w-full text-center text-sm font-medium text-gray-600 underline underline-offset-4 hover:text-prim-dark"
                >
                  Recommencer le paiement
                </button>
              </section>
            ) : (
              <form
                onSubmit={handleSubmit}
                aria-busy={paymentStatus === "processing"}
                className="rounded-xl border border-gray-200 bg-white p-5 sm:p-8"
              >
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-prim/10 text-prim-dark">
                  <Icon
                    icon="solar:map-point-linear"
                    width="21"
                    height="21"
                  />
                </span>
                <div>
                  <h2 className="font-unbounded text-lg font-semibold text-gray-900">
                    Informations de livraison
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Les champs marqués d’un * sont obligatoires.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Nom complet *
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-prim"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Téléphone *
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={30}
                    placeholder="+225 ..."
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-prim"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-email"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Adresse e-mail
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-prim"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-address"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Adresse de livraison *
                  </label>
                  <input
                    id="checkout-address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    required
                    maxLength={250}
                    placeholder="Commune, quartier, rue et repère"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-prim"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-details"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Instructions complémentaires
                  </label>
                  <textarea
                    id="checkout-details"
                    name="details"
                    rows={3}
                    maxLength={500}
                    placeholder="Informations utiles pour trouver votre adresse..."
                    className="w-full resize-y rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-prim"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-lg bg-gray-light p-4 text-sm leading-6 text-gray-600">
                <Icon
                  icon="solar:info-circle-linear"
                  width="20"
                  height="20"
                  className="mt-0.5 shrink-0 text-prim-dark"
                />
                <p>
                  Les frais, le délai de livraison et les modalités de paiement
                  seront confirmés par l’équipe avant validation définitive.
                </p>
              </div>

              <fieldset className="mt-8">
                <legend className="font-unbounded text-lg font-semibold text-gray-900">
                  Moyen de paiement
                </legend>
                <p className="mt-1 text-sm text-gray-500">
                  Choisissez le moyen que vous souhaitez utiliser.
                </p>

                <div className="mt-4 grid gap-3">
                  {[
                    {
                      value: "mobile-money",
                      label: "Mobile Money",
                      description: "Wave, Orange Money, MTN ou Moov",
                    },
                    {
                      value: "cash-on-delivery",
                      label: "Espèces à la livraison",
                      description: "Sous réserve de confirmation de la commande",
                    },
                    {
                      value: "to-confirm",
                      label: "À convenir avec l’équipe",
                      description: "Nous préciserons les options disponibles sur WhatsApp",
                    },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        paymentMethod === method.value
                          ? "border-prim bg-prim/5"
                          : "border-gray-200 hover:border-prim/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                        disabled={paymentStatus === "processing"}
                        className="mt-1 accent-prim"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-gray-900">
                          {method.label}
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          {method.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>

                {paymentMethod === "mobile-money" && (
                  <div className="mt-4">
                    <label
                      htmlFor="checkout-payment-phone"
                      className="mb-2 block text-sm font-medium text-gray-800"
                    >
                      Numéro à utiliser pour le paiement *
                    </label>
                    <input
                      id="checkout-payment-phone"
                      name="paymentPhone"
                      type="tel"
                      autoComplete="tel"
                      required
                      maxLength={30}
                      disabled={paymentStatus === "processing"}
                      placeholder="+225 ..."
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-prim"
                    />
                  </div>
                )}

                <p className="mt-4 rounded-lg bg-gray-light p-4 text-sm leading-6 text-gray-600">
                  Le paiement est effectué dans le navigateur.
                  Aucun opérateur n’est contacté et aucun montant n’est débité.
                  Ne saisissez jamais de code PIN ou de mot de passe.
                </p>
              </fieldset>

              {paymentStatus === "processing" && (
                <p
                  role="status"
                  className="mt-6 flex items-center gap-2 rounded-lg bg-prim/5 p-4 text-sm font-medium text-prim-dark"
                >
                  <Icon
                    icon="solar:refresh-linear"
                    width="20"
                    height="20"
                    className="animate-spin"
                  />
                  Paiement en cours…
                </p>
              )}

              <button
                type="submit"
                disabled={paymentStatus === "processing"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-prim px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-prim-dark disabled:cursor-wait disabled:opacity-70"
              >
                {paymentStatus === "processing"
                  ? "Simulation en cours…"
                  : paymentMethod === "mobile-money"
                    ? `Simuler le paiement de ${formatFcfa(totalAmount)} FCFA`
                    : paymentMethod === "cash-on-delivery"
                      ? "Simuler la commande avec paiement à la livraison"
                      : "Simuler la demande de commande"}
                {paymentStatus !== "processing" && (
                  <Icon icon="solar:card-2-linear" width="20" height="20" />
                )}
              </button>
              </form>
            )}

            <aside className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6">
              <h2 className="font-unbounded text-lg font-semibold text-gray-900">
                Récapitulatif
              </h2>

              <ul className="mt-5 divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <li
                    key={`${item.id}-${index}`}
                    className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.size} · Quantité : {item.quantity}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-gray-900">
                      {formatFcfa(parsePrice(item.price) * item.quantity)} FCFA
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-3 border-t border-gray-200 pt-5 text-sm">
                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Sous-total</span>
                  <span>{formatFcfa(totalAmount)} FCFA</span>
                </div>
                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Livraison</span>
                  <span>À confirmer</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-gray-100 pt-4 text-base font-bold text-gray-900">
                  <span>Total des produits</span>
                  <span className="text-prim-dark">
                    {formatFcfa(totalAmount)} FCFA
                  </span>
                </div>
              </div>

              <Link
                href="/UI-Components/Pages/Cart"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-prim-dark"
              >
                <Icon icon="solar:arrow-left-linear" width="18" height="18" />
                Modifier le panier
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
