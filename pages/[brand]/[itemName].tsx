"use client";
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Item = {
  name: string;
  vals: {
    img: string;
    status: number;
    upc: string[];
  };
};

type Location = {
  address: string;
  city: string;
  name: string;
  state: string;
  zip: string;
};

async function fetchBrandData(brand: string): Promise<Item[]> {
  const url = `https://new-dropz-api.onrender.com/drops/${brand}`;
  const res = await fetch(url);
  const data: Item[] = await res.json();
  return data;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Define your list of brands here
  const brands = ['doritos', 'cheetos', 'lays', 'mtndew', 'fritos', 'popcorners', 'pepsi'];
  let paths: { params: { brand: string; itemName: string } }[] = [];

  for (const brand of brands) {
    const data = await fetchBrandData(brand);
    const brandPaths = data.map((item) => ({
      params: { brand, itemName: item.name },
    }));
    paths = [...paths, ...brandPaths];
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context ?? {};
  const brand = params?.brand as string;
  const itemName = params?.itemName as string;

  const data = await fetchBrandData(brand);
  const itemData = data.find((item) => item.name === itemName);

  if (!itemData) {
    return { notFound: true };
  }

  return {
    props: { itemData },
  };
};

async function fetchLocs(lat: string, lon: string, upc: string) {
  const url = `https://new-dropz-api.onrender.com/getlocations`;
  const payload = {
    "lat": lat,
    "lon": lon,
    "upc": upc,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
}

const ItemPage = ({ itemData }: { itemData: Item }) => {
  const router = useRouter();
  const { lat, lon } = router.query;
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (lat && lon) {
      const upc = itemData.vals.upc[0];
      fetchLocs(lat as string, lon as string, upc).then(setLocations);
    }
  }, [lat, lon, itemData.vals.upc]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-primary-color p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-secondary-color">{itemData.name}</h1>
        <div className="relative w-full mb-6">
          <img src={itemData.vals.img} alt={itemData.name} className="object-cover w-full h-full rounded-lg" />
        </div>
        <div className="mb-4">
          <p className="text-lg mb-2"><strong>Status:</strong> {itemData.vals.status}</p>
          <p className="text-lg mb-4"><strong>UPC:</strong> {itemData.vals.upc.join(', ')}</p>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Locations</h2>
        {locations.length > 0 ? (
          <ul className="list-disc pl-5">
            {locations.map((location, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{location.name}</span> - {location.address}, {location.city}, {location.state} {location.zip}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-500">No locations found.</p>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
