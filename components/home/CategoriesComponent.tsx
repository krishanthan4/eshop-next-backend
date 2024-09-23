import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

interface CategoryType {
  catName: string;
  catImg: string;
}

interface types {
  CategoryObject: Array<CategoryType>;
}


export default async function CategoryComponent() {
 const data =  await prisma.category.findMany();

  return (
    <section aria-labelledby="products-heading" className="max-w-2xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
      <h2 id="products-heading" className="text-xl text-gray-200 p-3">Categories</h2>

      <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 gap-x-6 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-8">
        {data.map((e) => (
          <Link href={"/search?text=" + e.catName} className="group" key={e.catName}>
            <div className="w-full aspect-w-1 aspect-h-1 bg-[#1d1e20] rounded-2xl overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <Image width={500} height={500} draggable={false} src={"/images/" + e.catImg} alt={`${e.catName}`} className="w-full min-h-[8rem] object-center object-cover group-hover:opacity-75" />
            </div>
            <h3 className="mt-4 text-sm text-gray-400 text-center">{e.catName}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

