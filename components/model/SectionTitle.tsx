import React from 'react';

const brandNames: { [key: string]: string } = {
    doritos: 'Doritos',
    cheetos: 'Cheetos',
    lays: 'Lays',
    mtndew: 'Mountain Dew',
    fritos: 'Fritos',
    popcorners: 'Popcorners',
    pepsi: 'Pepsi',
    tacobell: 'Taco Bell'
};

const SectionTitle = ({ brand }: { brand: string }) => {
  const formattedBrand = brandNames[brand];

  return (
    <div className='flex justify-center items-center pb-9'>
      <div className='flex justify-center items-center'>
        <h1 className="text-4xl font-bold text-center text-primary-color">{formattedBrand}</h1>
      </div>
    </div>
  );
}

export default SectionTitle;