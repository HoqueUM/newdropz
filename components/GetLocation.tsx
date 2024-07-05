"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/router';

const LocationContext = createContext<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });

export const useLocation = () => useContext(LocationContext);

export const GetLocation = ({ children, itemName, brand, onLocationSet }: { children: ReactNode, itemName: string, brand: string, onLocationSet: (latitude: number, longitude: number) => void }) => {
  const router = useRouter();
  const [location, setLocation] = useState<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });

  const getLocation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          onLocationSet(latitude, longitude);  

          const href = `/${encodeURIComponent(brand)}/${encodeURIComponent(itemName)}?lat=${latitude}&lon=${longitude}`;
          router.push(href);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LocationContext.Provider value={location}>
      <div onClick={getLocation}>
        {children}
      </div>
    </LocationContext.Provider>
  );
};

export default GetLocation;
