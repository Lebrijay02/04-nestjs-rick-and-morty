"use client"
// components/CharacterCard.tsx
// components/CharacterCard.tsx
import React from 'react';
import Link from 'next/link';

interface Character {
 id: number;
 name: string;
 status: string;
 species: string;
 type: string;
 gender: string;
 origin: {
    name: string;
    url: string;
 };
 location: {
    name: string;
    url: string;
 };
 image: string;
 episode: string[];
 url: string;
 created: string;
}

interface CharacterCardProps {
 character: Character;
 onToggleFavorite: (id: number) => void;
 isFavorite: boolean; // New prop to indicate if the character is favorited
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onToggleFavorite, isFavorite }) => {
 return (
    <Link href={`/character/${character.id}`} className="bg-white shadow rounded-lg block">
      <div className='flex flex-row'>
        <img src={character.image} className="w-60 h-48 object-cover rounded-l-lg" />
        <div className="p-4 text-black">
          <h2 className="text-xl font-bold pb-">{character.name}</h2>
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong> Species:</strong> {character.species}</p>
          <p><strong> Gender:</strong> {character.gender}</p>
          <button onClick={(e) => { e.preventDefault(); onToggleFavorite(character.id); }} className={`${isFavorite ? 'text-yellow-500' : 'text-blue-500'}`}>
            Favorite
          </button>
        </div>
      </div>
    </Link>
 );
};

export default CharacterCard;

