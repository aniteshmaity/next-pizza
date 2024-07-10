"use client"


import { AuthContext } from '@/utils/authContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState} from 'react'
import { ColorRing } from 'react-loader-spinner';

const Order = () => {

  const {email} = useContext(AuthContext);

  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async (userEmail) => {
    try {
      const response = await fetch('api/myOrderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:userEmail }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch orders data');
      }
      const data = await response.json();
      setOrdersData(data?.data?.order_data );
      console.log(data.data.order_data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Handle error state or notify user
      setLoading(false);
    }
  };


  useEffect(() => {
    if (email) {
      fetchData(email);
    }
  }, [email]);


  return (
   <>
   {loading ? (
        <div className="flex items-center justify-center h-screen">
          <ColorRing
            visible={true}
            height={80}
            width={80}
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            color="#007bff" // Adjust color as needed
          />
        </div>
      ) : (
  
    <>
      {ordersData && ordersData.length > 0 ? (
        <div className="container my-4 mx-auto">
          {ordersData?.map((orders) => {
            return (
              <>
                {orders.map((data) => {
                  return (
                    <>
                      {data.order_date ? (
                        <div className="font-bold text-xl mb-2">
                          {" "}
                          {data.order_date} <hr />{" "}
                        </div>
                      ) : (
                        <div className="my-4 w-96 border-black border-gradient p-4 dark:border-white rounded-lg">
                          <div className="relative w-full rounded-lg h-72">
                            <Image
                              src={data.image}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg"
                              alt="pizza"
                            />
                          </div>
                          <div className="font-bold text-xl">{data.name}</div>
                          <div className="flex justify-between items-center">
                            <div>{data.qty}</div>
                            <div>{data.size}</div>
                            <div className="font-semibold">{data.price}/-</div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
            );
          })}
        </div>
      ) : (
        <div className="flex w-screen flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold"> No previous Orders 😅</h1>
          {/* <p className="text-gray-600 mt-4">No previous Orders 😅</p> */}
          <Link
            href="/"
            className="text-violet-500 text-xl hover:font-bold mt-8"
          >
            Go back to the home
          </Link>
        </div>
       )}
       </>
     )}
   </>
 );
}

export default Order