import React from 'react'
import prisma from "../../../../../lib/db";
import ChooseQty from '../ChooseQty';
import AddToCartButton from '../AddToCartButton';
import {policies} from '@/lib/Object';
import { redirect } from 'next/navigation';


export default async function page({params}:{params:{id:string}}) {
    const product = await prisma.product.findUnique({
    where:{
        id:parseInt(params.id)
    },
    select:{
        id:true,
        title:true,
        price:true,
        description:true,
        qty:true,
        productImg:true,
        color:{
            select:{
                clrName:true
            }
        }
    }
 });

 if(!product)
    redirect('/home');
    
    return (
    <div>
          <div className="">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
              <h1
  id="product_title"
  className="text-xl font-medium text-gray-200"
>
  {product?.title && product.title.length > 30 
    ? product.title.substring(0, 30) + '...' 
    : product?.title}
</h1>

                <p
                  id="product_price"
                  className="text-xl font-medium text-gray-200"
                >
                  Rs.{product?.price}.00
                </p>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <div className="grid grid-cols-2 mx-auto">
                <div className="bg-[#2b2d30a4] mb-4 h-fit p-4 rounded-md">
                  {product?.productImg && (
                    <img
                      key={product.id}
                      alt={`${product.title}`}
                      src={"/images/" + product.productImg[0].imgPath}
                      className="w-full rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <div>
                {/* Color picker */}
                <div>
                  <h2 className="text-sm font-medium text-gray-200">Color</h2>
                  <fieldset aria-label="Choose a color" className="mt-2">
                    <div
                      className={`bg-${product?.color.clrName}-500 rounded-full w-5 h-5 border border-${product?.color.clrName}-500`}
                    ></div>
                  </fieldset>
                </div>

<p className={`text-xs my-3 ms-5 ${product?.qty && product.qty > 0 ? 'bg-green-900/50' : 'bg-red-900/50'} text-gray-400 w-fit p-1 px-2 rounded-lg`}>{product?.qty && product.qty > 0 ? 'In Stock' : 'Out Of Stock'}</p>

{/* <div><p>Available Quantity : {product?.qty}</p></div> */}
          {product && <ChooseQty products={product}/>}

             {product && <AddToCartButton products={product}/>}
              </div>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-200">
                  Description
                </h2>
                <div className="prose prose-sm mt-4 text-gray-500" />
                {product?.description}
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="rounded-lg bg-[#222427] p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          aria-hidden="true"
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                        />
                        <span className="mt-4 text-sm font-medium">
                          {policy.name}
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* <RelatedProducts /> */}
    </div>
    </div>
  )
}
