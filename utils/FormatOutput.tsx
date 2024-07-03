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
  const [items, setItems] = useState<{ id: number, img: string, name: string }[]>([]);

  useEffect(() => {
    getProps(brand).then(setItems);
  }, [brand]);

  return (
    <div className='flex flex-wrap justify-center gap-4'>
    {items.map((item) => (
        <ItemCard key={item.id} image={item.img} name={item.name} />
    ))}
    </div>
  );
};

export default FormatOutput;
