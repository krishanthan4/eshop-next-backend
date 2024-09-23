"use client";
interface types{
    id: number;
    price: number | null;
    qty: number | null;
    description: string | null;
    title: string | null;
    color: {
        clrName: string;
    };
    productImg: {
        imgPath: string;
        productId: number;
    }[];
}
export default function AddToCartButton({products}:{products:types}) {

  return (
           <button
                   disabled={(products?.qty ?? 0) <= 0}
                  className={`mt-8 ${(products?.qty ==0 ? ' cursor-not-allowed opacity-15' : '')} flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  Add to cart
                </button>
  )
}
