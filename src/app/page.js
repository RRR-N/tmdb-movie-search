'use client';

// app/page.js
import { useState } from 'react';
import { searchMovies } from '../lib/tmdb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">TMDB Movie Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <Button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </Button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <Card key={movie.id} className="mb-4 p-4 border border-gray-200 rounded">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto"
              />
            )}
            <div className="p-4">
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
