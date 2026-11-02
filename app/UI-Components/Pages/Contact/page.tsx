"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, type FormEvent } from "react";

const phoneNumber = "+225 07 57 98 51 47";
const whatsappNumber = "2250757985147";
const contactEmail = "djablechristian0@gmail.com";

export default function ContactPage() {
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const whatsappMessage = [
      "Bonjour DcoShop,",
      "",
      `Nom : ${name}`,
      `E-mail : ${email}`,
      `Sujet : ${subject}`,
      "",
      message,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setFormMessage(
      "Votre message est prêt dans WhatsApp. Envoyez-le depuis l’application pour finaliser le contact.",
    );
  };

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-gray-light">
        <Image
          src="/contact-01.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-950/55" />
        <div className="relative mx-auto flex min-h-64 max-w-7xl flex-col justify-center px-5 py-14 sm:min-h-80 sm:px-8 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
            DcoShop est à votre écoute
          </p>
          <h1 className="mt-3 max-w-3xl font-unbounded text-3xl font-semibold text-white sm:text-5xl">
            Parlons de vos achats
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
            Une question sur un produit ou une commande ? Contactez notre
            équipe, nous serons heureux de vous aider.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prim-dark">
            Contact
          </p>
          <h2 className="mt-3 font-unbounded text-2xl font-semibold text-gray-900 sm:text-3xl">
            Comment pouvons-nous vous aider ?
          </h2>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            Choisissez le moyen de contact qui vous convient ou envoyez-nous
            votre demande via le formulaire.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="tel:+2250757985147"
              className="group flex items-start gap-4 rounded-xl border border-gray-200 p-4 transition-colors hover:border-prim/50 hover:bg-orange-50/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-prim/10 text-prim-dark">
                <Icon icon="solar:phone-linear" width="22" height="22" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">
                  Appelez-nous
                </span>
                <span className="mt-1 block text-sm text-gray-600">
                  {phoneNumber}
                </span>
              </span>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-gray-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50/50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Icon icon="ic:baseline-whatsapp" width="22" height="22" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">
                  Écrivez-nous sur WhatsApp
                </span>
                <span className="mt-1 block text-sm text-gray-600">
                  Réponse directe par message
                </span>
              </span>
            </a>

            <a
              href={`mailto:${contactEmail}`}
              className="group flex items-start gap-4 rounded-xl border border-gray-200 p-4 transition-colors hover:border-prim/50 hover:bg-orange-50/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-prim/10 text-prim-dark">
                <Icon icon="solar:letter-linear" width="22" height="22" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-gray-900">
                  Envoyez-nous un e-mail
                </span>
                <span className="mt-1 block break-all text-sm text-gray-600">
                  {contactEmail}
                </span>
              </span>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Angr%C3%A9%2C+Cocody%2C+Abidjan%2C+C%C3%B4te+d%E2%80%99Ivoire"
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-gray-200 p-4 transition-colors hover:border-prim/50 hover:bg-orange-50/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-prim/10 text-prim-dark">
                <Icon icon="solar:map-point-linear" width="22" height="22" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">
                  Notre adresse
                </span>
                <span className="mt-1 block text-sm text-gray-600">
                  Angré, Cocody, Abidjan
                </span>
                <span className="mt-1 block text-xs font-medium text-prim-dark">
                  Voir sur la carte
                </span>
              </span>
            </a>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-lg bg-gray-light p-4 text-sm leading-6 text-gray-600">
            <Icon
              icon="solar:delivery-linear"
              width="20"
              height="20"
              className="mt-0.5 shrink-0 text-prim-dark"
            />
            <p>
              Pour les informations de livraison, notre service est annoncé
              disponible le lendemain de 10 h à 23 h.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="font-unbounded text-xl font-semibold text-gray-900">
            Envoyez-nous un message
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Le formulaire ouvrira WhatsApp avec votre message déjà préparé.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Votre nom
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Ex. Awa Traoré"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-prim"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Votre adresse e-mail
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="vous@exemple.com"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-prim"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Sujet
              </label>
              <select
                id="contact-subject"
                name="subject"
                required
                defaultValue=""
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-prim"
              >
                <option value="" disabled>
                  Choisissez un sujet
                </option>
                <option value="Question sur un produit">
                  Question sur un produit
                </option>
                <option value="Suivi de commande">Suivi de commande</option>
                <option value="Livraison">Livraison</option>
                <option value="Autre demande">Autre demande</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Votre message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                placeholder="Décrivez votre demande..."
                className="w-full resize-y rounded-md border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-prim"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-prim px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-prim-dark sm:w-auto"
            >
              Continuer sur WhatsApp
              <Icon icon="ic:baseline-whatsapp" width="20" height="20" />
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`text-sm leading-6 text-green-700 ${formMessage ? "" : "sr-only"}`}
            >
              {formMessage}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
