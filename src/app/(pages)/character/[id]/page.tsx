"use client"
// src/app/pages/character/[id]/page.tsx
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const CharacterPage: React.FC = () => {
 const router = useRouter();
 const { id } = useParams(); // Use useParams to get the id
 const [character, setCharacter] = useState<any>(null);

 useEffect(() => {
    if (id) {
      fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => response.json())
        .then(data => setCharacter(data));
    }
 }, [id]);

 if (!character) return <div>Loading...</div>;

 return (
    <div className='flex flex-col p-10'>
      <div className='flex flex-row pb-10'>
        <img src={character.image} className="w-60 h-60 object-cover rounded-md" />
        <div className='flex flex-col px-4'>
          <h1 className="text-4xl font-bold">{character.name}</h1>
          <p className='p-3'>{character.status} - {character.gender}</p>
          <p><strong>Origin:</strong> {character.origin.name}</p>
          <p><strong>Location:</strong> {character.location.name}</p>
        </div>
        <div className='pl-10'>
          <button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded w-60 h-10" onClick={() => router.back()}>
            Back
          </button>
        </div>
      </div>
      <h1 className="text-xl font-bold">Episodes:</h1>
      <ul className="list-disc pl-5">
        {character.episode.map((episodeUrl: any, index : any) => {
          const episodeNumber = episodeUrl.split('/').pop();
          return <li className="p-2" key={index}>Episode {episodeNumber}</li>;
        })}
      </ul>
    </div>
 );
};

export default CharacterPage;
