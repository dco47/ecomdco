"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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
				<p className="font-sen text-sm font-semibold uppercase tracking-[0.28em] text-prim">Cart</p>
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
									className="rounded-md border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors duration-300 hover:bg-red-600 hover:text-white"
								>
									Supprimer
								</button>
							</article>
						))}

						<div className="mt-6 flex items-center justify-between rounded-xl bg-gray-100 p-4">
							<span className="text-base font-semibold text-black">Total</span>
							<span className="text-lg font-bold text-black">{formatFcfa(totalAmount)} FCFA</span>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}
