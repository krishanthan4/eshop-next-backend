"use client";
import React, { useState } from 'react'

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
export default function ChooseQty({products}:{products:types}) {
  let [selectedQty, setSelectedQty] = useState(1);

  return (
    <>
             <div className="flex justify-between max-w-60 my-4 items-center">
                  <label className="block mb-1 text-gray-500">
                    Choose quantity:
                  </label>
                  <div className="relative flex items-center">
                    {/* Decrement Button */}
                    <button
                      onClick={() => {
                        setSelectedQty((prevQty) => Math.max(prevQty - 1, 1));
                      }}
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="counter-input"
                      className={`${
                        selectedQty <= 1 ? "disabled" : ""
                      } flex-shrink-0 bg-[#3a3d41] hover:bg-[#28292c] inline-flex items-center justify-center rounded-md h-6 w-6`}
                      disabled={selectedQty <= 1} // Disable button if selectedQty is less than or equal to 1
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>

                    {/* Quantity Input */}
                    <input
                      type="text"
                      id="counter-input"
                      data-input-counter
                      data-input-counter-min="1"
                      data-input-counter-max={products?.qty}
                      className="flex-shrink-0 text-gray-400 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                      placeholder=""
                      value={selectedQty}
                      readOnly
                      required
                    />

                    {/* Increment Button */}
                    <button
                      onClick={() => {
                        setSelectedQty((prevQty) =>
                          Math.min(prevQty + 1, products?.qty || 0)
                        );
                      }}
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="counter-input"
                      className={`${
                        selectedQty >= (products?.qty || 0) ? "disabled" : ""
                      } flex-shrink-0 bg-[#3a3d41] hover:bg-[#28292c] inline-flex items-center justify-center rounded-md h-6 w-6`}
                      disabled={selectedQty >= (products?.qty || 0)} // Disable button if selectedQty is greater than or equal to product.qty
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
    </>
  )
}
