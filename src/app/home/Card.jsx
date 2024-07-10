"use client";
import React, { useEffect, useState } from "react";
// import cardData from "@/store/cardData.json";
import CardItems from "./CardItems"; // Adjust the path as needed
import { allItemData } from "@/services/allDataService";
import { ColorRing } from "react-loader-spinner";

const MainComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    
    const fetchData = async () => {
   
      try {
        setLoading(true);
        const fetchData = await allItemData();
        setData(fetchData.data);
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false); // Set loading to false after fetching data (whether successful or not)
      }
    };
    fetchData();
  
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ColorRing
          visible={true} // or use loading state directly: visible={loading}
          height={80}
          width={80}
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          color="#007bff" // Adjust color as needed
        />
      </div>
    );
  }

  // Extract categories and filter logic
  console.log(data);
  const categoryArray = data.map((card) => card?.category);
  const categorySet = new Set(categoryArray);
  const categories = [...categorySet];

 



  return (
    <div className="container mx-auto px-3">

<div className="my-6 space-x-5">
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              !typeFilter && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => setTypeFilter(false)}
          >
            All
          </button>
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              typeFilter === "Veg" && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => {
              setTypeFilter("Veg");
            }}
          >
            <span
              className={
                "lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500"
              }
            >
              ●
            </span>
            Veg
          </button>
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              typeFilter === "Non-Veg" && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => {
              setTypeFilter("Non-Veg");
            }}
          >
            <span
              className={
                "lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500"
              }
            >
              ●
            </span>
            Non Veg
          </button>
        </div>

      {categories.map((category) => (
        <div key={category}>
          <div className="text-4xl mt-10 mb-3 uppercase font-bold">{category}</div>
          <hr />
          <div className="flex flex-col items-center justify-center">
            <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {data
                ?.filter((card) => card.category === category)
                ?.filter((food)=> typeFilter ? typeFilter===food.foodType : food)
                ?.map((card, index) => (
                  <CardItems key={index} card={card} />
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainComponent;
