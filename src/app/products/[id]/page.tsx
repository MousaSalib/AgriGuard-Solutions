import { getSingleProduct } from "@/apiCalls/productApiCalls";
import AddComment from "@/components/comments/AddComment";
import Comments from "@/components/comments/Comments";
import { SingleProduct } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";

interface SingleProductPageProps {
  params: { id: string };
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  const product: SingleProduct = await getSingleProduct(params.id);
  return (
    <section className="container mx-auto my-auto px-4 w-full sm:w-full md:w-2/3 lg:w-1/2">
      <div
        className="bg-customGreen rounded-lg py-6 px-4 sm:py-8 sm:px-6 mt-3"
        style={{
          border: "2px solid #ffff00",
        }}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            {product.title}
          </h1>
          <span style={{ color: "#ffff00" }}>{product.price} EGP</span>
        </div>
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-xl" style={{ color: "#ffff00" }}>
            {product.category}
          </h4>
          <p
            style={{
              color: "#ffff00",
            }}
          >
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="text-xl sm:text-xl">{product.description}</p>
      </div>
      {payload ? (
        <AddComment productId={product.id} />
      ) : (
        <>
          <span className="text-2xl text-customGreen font-semibold flex justify-center">
            Please, Login to can add a comment!
          </span>
        </>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3 mt-3">
        Comments
      </h1>
      {product.comments.map((comment) => (
        <Comments key={comment.id} comment={comment} userId={payload?.id} />
      ))}
    </section>
  );
};

export default SingleProductPage;
