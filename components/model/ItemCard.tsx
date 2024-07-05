import React, { useState } from 'react'; // Add useState import
import Image from 'next/image';
import GetLocation from '../GetLocation';

const ItemCard = ({ image, name, brand, onLocationSet }: { image: string, name: string, brand: string, onLocationSet: () => void }) => {

  const handleClick = () => {
    console.log("Clicked on item card");
    onLocationSet(); // Call onLocationSet when the item card is clicked
  };

  const handleTouchStart = () => {
    console.log("Touch started on item card");
    // Optionally, you can call onLocationSet here if you want the location set event to trigger on touch start
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Touch ended on item card");
    onLocationSet(); // Call onLocationSet when the touch ends on the item card
  };

  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);

  // This function is not used within this component. 
  // If it's intended for external use, consider passing it as a prop or lifting state up.
  const handleLocationSet = (lat: number, lon: number) => {
    setLatitude(lat.toString());
    setLongitude(lon.toString());
  };

  return (
    <div onClick={handleClick} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
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