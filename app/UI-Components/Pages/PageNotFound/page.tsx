export default function PageNotFoundPage() {
	return (
		<main className="bg-white">
			<section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-start justify-center px-4 py-16 sm:px-6 lg:px-8">
				<p className="font-sen text-sm font-semibold uppercase tracking-[0.28em] text-prim">404</p>
				<h1 className="font-unbounded mt-3 text-3xl font-semibold text-black sm:text-5xl">Page introuvable</h1>
				<p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
					Cette route peut servir de page d’erreur ou de contenu temporaire.
				</p>
			</section>
		</main>
	);
}
