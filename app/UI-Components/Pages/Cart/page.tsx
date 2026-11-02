"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";

type CartItem = {
	id: string;
	title: string;
	image: string;
	price: string;
	size: string;
	quantity: number;
};

const parsePrice = (price: string) => Number(price.replace(/\s/g, ""));
const formatFcfa = (value: number) => new Intl.NumberFormat("fr-FR").format(value);

export default function CartPage() {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const updateCart = () => {
			const stored = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
			setCartItems(stored);
		};

		updateCart();
		window.addEventListener("cartUpdated", updateCart);

		return () => {
			window.removeEventListener("cartUpdated", updateCart);
		};
	}, []);

	const totalAmount = useMemo(() => {
		return cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
	}, [cartItems]);

	const removeCartItem = (itemIndex: number) => {
		const updatedItems = cartItems.filter((_, index) => index !== itemIndex);
		setCartItems(updatedItems);
		localStorage.setItem("cart", JSON.stringify(updatedItems));
		window.dispatchEvent(new Event("cartUpdated"));
	};

	return (
		<main className="bg-white">
			<section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
				<h1 className="font-unbounded mt-3 text-3xl font-semibold text-black sm:text-5xl">Votre panier</h1>

				{cartItems.length === 0 ? (
					<p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
						Votre panier est vide pour le moment.
					</p>
				) : (
					<div className="mt-8 space-y-4">
						{cartItems.map((item, index) => (
							<article
								key={`${item.id}-${index}`}
								className="flex items-center gap-4 rounded-xl border border-gray-200 p-4"
							>
								<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-50">
									<Image src={item.image} alt={item.title} fill className="object-cover" />
								</div>

								<div className="min-w-0 flex-1">
									<h2 className="truncate text-base font-semibold text-black">{item.title}</h2>
									<p className="text-sm text-gray-600">Taille: {item.size}</p>
									<p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
								</div>

								<p className="text-sm font-bold text-black">
									{formatFcfa(parsePrice(item.price) * item.quantity)} FCFA
								</p>

								<button
									type="button"
									onClick={() => removeCartItem(index)}
									aria-label={`Supprimer ${item.title} du panier`}
									title="Supprimer du panier"
									className="rounded-md text-red-600 transition-colors duration-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
								>
									<Icon icon="tabler:trash" width="20" height="20" aria-hidden="true" />
								</button>
							</article>
						))}

						<div className="mt-6 flex items-center justify-between rounded-xl bg-gray-100 p-4">
							<span className="text-base font-semibold text-black">Total</span>
							<span className="text-lg font-bold text-black">{formatFcfa(totalAmount)} FCFA</span>
						</div>

						<div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
							<p className="text-sm text-gray-600">
								Finalisez votre commande et accédez à la simulation de paiement.
							</p>
							<Link
								href="/UI-Components/Pages/Checkout"
								className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-prim px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-prim-dark sm:w-auto"
							>
								Continuer vers le paiement
								<Icon icon="solar:arrow-right-linear" width="18" height="18" aria-hidden="true" />
							</Link>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}
