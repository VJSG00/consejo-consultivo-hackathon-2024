import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, link }) => {
  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg">
      <Link to={link}>
        <img className="rounded-t-lg w-full h-48 object-cover" src={imageUrl} alt={title} />
      </Link>
      <div className="p-6">
        <Link to={link}>
          <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{title}</h5>
        </Link>
        <p className="mb-4 font-normal text-gray-700">{description}</p>
        <Link to={link} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Read more
          <svg className="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
