const productSkeleton = [1, 2, 3, 4, 5, 6];
const paginationSkeleton = [1, 2, 3, 4];

const ProductsLoading = () => {
  return (
    <div className="mx-3 animate-pulse">
      <form
        className="w-full lg:w-3/4 md:w-4/5 mt-3 bg-customGreen p-2 rounded-lg flex justify-center gap-1 mx-auto"
        style={{
          border: "2px solid #ffff00",
        }}
      >
        <div className="w-full h-12 bg-gray-400 rounded-lg"></div>
        <div className="ml-3 w-20 h-12 bg-gray-400 rounded-lg"></div>
      </form>
      <div className="flex justify-center flex-wrap gap-1">
        {productSkeleton.map((item) => (
          <div
            key={item}
            className="w-full lg:w-1/4 md:w-2/5 m-3 bg-customGreen p-6 rounded-lg shadow"
            style={{
              border: "2px solid #ffff00",
            }}
          >
            <div className="flex justify-between mb-4">
              <div className="w-2/4">
                <div className="h-6 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-400 rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-gray-400 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-400 rounded w-full"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-1/4 mx-auto mb-3">
        <div
          className="w-1/3 p-2 flex justify-center items-center bg-customGreen rounded-lg m-1"
          style={{
            border: "2px solid #ffff00",
          }}
        >
          <div className="h-6 w-8 bg-gray-400 rounded"></div>
        </div>
        {paginationSkeleton.map((item) => (
          <div
            key={item}
            className="w-1/3 p-2 flex justify-center items-center bg-customGreen rounded-lg m-1"
            style={{
              border: "2px solid #ffff00",
            }}
          >
            <div className="h-6 w-6 bg-gray-400 rounded"></div>
          </div>
        ))}

        <div
          className="w-1/3 p-2 flex justify-center items-center bg-customGreen rounded-lg m-1"
          style={{
            border: "2px solid #ffff00",
          }}
        >
          <div className="h-6 w-8 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductsLoading;
