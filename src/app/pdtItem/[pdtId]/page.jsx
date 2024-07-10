
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'


const getItem = async (productid) => {
  const res = await fetch(`${process.env.BASE_URL}/api/alldata/${productid}`);
  console.log("data------", res);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const Item = async ({params}) => {
const {pdtId}= params;
console.log(pdtId);
const item = await getItem(pdtId);
console.log("items--------", item.data);


  return (
    <>
    
    <div className="min-h-screen px-10">
      <Link href={"/"}>
        <div className="container max-w-md  flex my-6 cursor-pointer hover:scale-125  justify-center items-center mx-auto ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </Link>

      <div className="container border-gradient max-w-md p-6 md:p-8 mb-16 mx-auto  flex space-y-4 flex-col items-center justify-center">
        <div className="relative w-full h-96 rounded-lg lg:w-96">
          <Image
            src={item.data.img}
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            alt="item image"
          />
        </div>

        <div className="font-extrabold mb-2 text-base md:text-2xl uppercase ">
        {item.data.name}
        </div>
        <div className=" max-w-sm text-base md:text-lg text-gray-700 dark:text-gray-400">
         {item.data.description}
        </div>
      </div>
    </div>
    </>
  )
}

export default Item