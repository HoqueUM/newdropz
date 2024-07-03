import React from 'react'
import Image from 'next/image'

const ItemCard = ({ image, name }: { image: string, name: string } ) => {
    return (
        <a target="_blank" rel="noopener noreferrer">
          <div className="transform transition-transform duration-300 hover:scale-105 max-w-xs rounded overflow-hidden shadow-lg hover:shadow-2xl bg-primary-color">
            <div className="relative w-full h-48"> {/* Fixed height for the image */}
              <Image
                src={image}
                alt="No Image Found"
                layout="fill"
                objectFit="cover"
              />
            </div>
              <div>
                <div className="font-bold text-xl mb-2 text-secondary-color">{name}</div>
              </div>
          </div>
        </a>
    );
  };

export default ItemCard