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
    <div>
      <h1>{itemData.name}</h1>
      <img src={itemData.vals.img} alt={itemData.name} />
      <p>Status: {itemData.vals.status}</p>
      <p>UPC: {itemData.vals.upc.join(', ')}</p>
      <h2>Locations</h2>
      {locations.length > 0 ? (
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              {location.name} - {location.address}, {location.city}, {location.state} {location.zip}
            </li>
          ))}
        </ul>
      ) : (
        <p>No locations found.</p>
      )}
    </div>
  );
};

export default ItemPage;
