export default function CartPage() {
	return (
		<main className="bg-white">
			<section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
				<p className="font-sen text-sm font-semibold uppercase tracking-[0.28em] text-prim">Cart</p>
				<h1 className="font-unbounded mt-3 text-3xl font-semibold text-black sm:text-5xl">Votre panier</h1>
				<p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
					Cette page peut lister les produits ajoutés au panier et le résumé de commande.
				</p>
			</section>
		</main>
	);
}
