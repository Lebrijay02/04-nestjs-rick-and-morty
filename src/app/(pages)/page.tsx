"use client"
import React, { useEffect, useState } from 'react';
import CharacterCard from './components/CharacterCard';
import Cookies from 'js-cookie';

const HomePage: React.FC = () => {
 const [characters, setCharacters] = useState<any[]>([]);
 const [favorites, setFavorites] = useState<number[]>([]);
 const [showFavorites, setShowFavorites] = useState<boolean>(false);

 useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results);
        const savedFavorites = Cookies.get('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      });
 }, []);

 const handleToggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id];
    setFavorites(newFavorites);
    Cookies.set('favorites', JSON.stringify(newFavorites));
 };

 const filteredCharacters = showFavorites ? characters.filter(character => favorites.includes(character.id)) : characters;

 return (
    <div className="container mx-auto p-4">
      <button onClick={() => setShowFavorites(!showFavorites)} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {showFavorites ? 'Show All Characters' : 'Show Favorites Only'}
      </button>
      <div className='px-50'>
        <div className="grid grid-cols-2 gap-20">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.includes(character.id)} />
          ))}
        </div>
      </div>
    </div>
 );
};

export default HomePage;
