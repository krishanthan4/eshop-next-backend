import prisma from '@/lib/db'
import React from 'react'
import ProductComponent from './ProductComponent';

export default async function ProductsComponent() {
let products = await prisma.product.findMany({ select:{
    productImg:true,
    title:true,
    price:true,
    id:true,
  }});
    return (
    <>
    <div className='-mx-px  gap-1 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-6'>
    <ProductComponent ProductObject={products}/>
    </div>
    </>
  )
}
