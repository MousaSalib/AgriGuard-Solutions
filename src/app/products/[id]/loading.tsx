const SingleProductSkeleton = () => {
  return (
    <section className="container mx-auto my-auto px-4 w-full sm:w-full md:w-2/3 lg:w-1/2">
      <div
        className="bg-customGreen rounded-lg py-6 px-4 sm:py-8 sm:px-6 mt-3"
        style={{
          border: "2px solid #ffff00",
        }}
      >
        <div className="flex justify-between mb-3">
          <div className="bg-gray-300 h-8 w-2/4 rounded animate-pulse"></div>
          <div className="bg-gray-300 h-6 w-1/4 rounded animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="bg-gray-300 h-6 w-1/3 rounded animate-pulse"></div>
          <div className="bg-gray-300 h-6 w-1/4 rounded animate-pulse"></div>
        </div>
        <div className="bg-gray-300 h-6 w-full rounded mb-4 animate-pulse"></div>
        <div className="bg-gray-300 h-6 w-5/6 rounded mb-4 animate-pulse"></div>
        <div className="bg-gray-300 h-6 w-3/4 rounded mb-4 animate-pulse"></div>
      </div>

      <div
        className="container bg-customGreen p-2 mx-auto w-full sm:w-full md:w-2/3 lg:w-full mt-3 rounded-lg"
        style={{
          border: "2px solid #ffff00",
        }}
      >
        <div className="bg-gray-300 h-10 w-full rounded-lg animate-pulse mb-3"></div>
        <div className="bg-gray-300 h-10 w-full rounded-lg animate-pulse"></div>
      </div>
    </section>
  );
};

export default SingleProductSkeleton;
