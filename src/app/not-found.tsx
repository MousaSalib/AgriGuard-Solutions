import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-customPink dark:text-primary-500 text-red-500">
            404
          </h1>
          <p
            className="mb-4 text-3xl tracking-tight font-bold md:text-4xl"
            style={{ color: "#ffff00" }}
          >
            Something&#39;s missing.
          </p>
          <p className="mb-4 text-2xl font-semibold">
            Sorry, we can&#39;t find that page. You&#39;ll find lots to explore
            on the home page.
          </p>
          <Link href="/" className="text-blue-600 underline text-xl">
            GO TO HOME PAGE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
