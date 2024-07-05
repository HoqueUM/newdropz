import React, { useState } from 'react';
import Image from 'next/image';
import GetLocation from '../GetLocation';

const ItemCard = ({ image, name, brand }: { image: string, name: string, brand: string }) => {
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);

  const handleLocationSet = (lat: number, lon: number) => {
    setLatitude(lat.toString());
    setLongitude(lon.toString());
  };

  return (
    <div>
      <GetLocation itemName={name} brand={brand} onLocationSet={handleLocationSet}>
        <div className="relative w-full h-48 transform transition-transform duration-300 hover:scale-105 max-w-xs rounded overflow-hidden shadow-lg hover:shadow-2xl bg-primary-color">
          <Image
            src={image}
            alt="No Image Found"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </GetLocation>
      <div className="font-bold text-xl mb-2 text-secondary-color">{name}</div>
    </div>
  );
};

export default ItemCard;
