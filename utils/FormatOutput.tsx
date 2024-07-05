"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ItemCard from '@/components/model/ItemCard';

async function getProps(brand: string) {
  const url = `https://new-dropz-api.onrender.com/drops/${brand}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

const FormatOutput = ({ brand }: { brand: string }) => {
  type Item = {
    id: number;
    name: string;
    vals: {
      img: string;
      status: number; 
      upc: string[]; 
    };
  };
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getProps(brand).then(setItems);
  }, [brand]);

  return (
    <div className='flex flex-wrap justify-center gap-4'>
    {items.map((item) => (
        <ItemCard key={item.id} image={item.vals.img} name={item.name} brand={brand} onLocationSet={() => {}} />
    ))}
    </div>
  );
};

export default FormatOutput;
