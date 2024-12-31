"use client";
import { CategoryListData } from "@/Shared/Data";
import Image from "next/image";
import React, { useState } from "react";

function CategoryList({ setSelectedCategory }: { setSelectedCategory: any }) {
  const [selectedCategory, setSelectedCategory_] = useState();

  return (
    <div>
      <h2
        className="text-[20px] mt-3 
        font-bold mb-3"
      >
        Select Your Fav Category
      </h2>
      <div className="flex gap-6 mb-5">
        {CategoryListData.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCategory(item.value);
              setSelectedCategory_(item);
            }}
          >
            <div
              className={`flex flex-col items-center bg-purple-100
  p-3 rounded-2xl hover:scale-105 
  transition-all w-[90px]
    duration-100
    cursor-pointer ${
      selectedCategory?.name == item.name ? "bg-purple-200" : null
    }`}
            >
              <Image src={item.icon} alt={item.name} width={35} height={35} />
              <h2
                className="text-[12px]
        text-purple-700 line-clamp-1"
              >
                {item.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
