"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cartContext } from "@/utils/contextReducer";


const CardItems = ({ card }) => {


  const { state,dispatch } = useContext(cartContext);

  const [qty, setQty] = useState(1);
  const priceOptions = Object.keys(card.price);
  const [size, setSize] = useState(priceOptions[0]); // Default to first size option

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const finalPrice = qty * parseInt(card.price[size]);

  const handleAddToCart = () => {
    if (!card || !size) {
      console.error("Card or size is undefined");
      return;
    }
  
    const tempId = card["_id"] + size;
    const updateItem = state.find((e) => e.tempId === tempId);
    
    if (!updateItem) {
      console.log("Adding new item to cart...");
      dispatch({
        type: "ADD",
        id: card["_id"],
        tempId: tempId,
        name: card.name,
        price: finalPrice,
        qty: qty,
        priceOptions: size,
        image: card.img,
      });
    } else {
      console.log("Updating existing item in cart...");
      dispatch({
        type: "UPDATE",
        tempId: tempId,
        price: finalPrice,
        qty: qty,
      });
    }
  };
  console.log("state----", state);





  return (
    <div className="box">
      <div className="w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient">
        <Link href={`/pdtItem/${card["_id"]}`}>
          <div className="relative w-full h-80">
            <Image src={card.img} layout="fill" objectFit="cover" alt="pizza" />
          </div>
          <div className="p-4">
            <div className="font-bold mb-2 text-xl uppercase">{card.name}</div>
            <p className="short_description text-gray-700 dark:text-gray-400 text-base">
              {card.description}
            </p>
          </div>
        </Link>
        <div className="flex px-4 justify-between">
          <select
            className="h-10 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
            onChange={handleQty}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="h-10 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
            value={size}
            onChange={handleSize}
          >
            {priceOptions.map((sizeOption, i) => (
              <option key={i} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>
        <div className="flex p-4 font-bold justify-between">
          <button
            className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100 "
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <p className="p-2 text-xl">₹{finalPrice} /-</p>
        </div>
      </div>
    </div>
  );
};

export default CardItems;
