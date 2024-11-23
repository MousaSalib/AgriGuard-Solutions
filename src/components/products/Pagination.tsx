import Link from "next/link";

interface PaginationProps {
  pageNumber: number;
  route: string;
  pages: number;
}
const Pagination = ({ pageNumber, route, pages }: PaginationProps) => {
  const pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);
  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className="flex justify-center w-1/4 mx-auto mb-3">
      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="w-1/3 p-2 flex justify-center items-center bg-customGreen rounded-lg m-1 cursor-pointer hover:bg-customGreenOnHover transition"
          style={{
            border: "2px solid #ffff00",
          }}
        >
          Prev
        </Link>
      )}
      {pagesArray.map((page) => (
        <Link
          href={`${route}?pageNumber=${page}`}
          className={`${
            pageNumber === page ? "bg-customGreenOnHover" : ""
          } w-1/3 p-2 flex justify-center items-center bg-customGreen rounded-lg m-1 border cursor-pointer hover:bg-customGreenOnHover transition`}
          style={{
            border: "2px solid #ffff00",
            color: pageNumber === page ? "#ffff00" : undefined,
            fontWeight: pageNumber === page ? "bold" : undefined,
            fontSize: pageNumber === page ? "18px" : undefined,
          }}
          key={page}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="w-1/3 p-2 flex justify-center items-center bg-customGreen rounded-lg m-1 border cursor-pointer hover:bg-customGreenOnHover transition"
          style={{
            border: "2px solid #ffff00",
          }}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
