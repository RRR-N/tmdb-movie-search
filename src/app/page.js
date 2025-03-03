'use client';

import React, { useState, useEffect } from 'react';
import { searchMovies } from '../lib/tmdb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ModeToggle } from '@/components/ModeToggle';

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
      <ModeToggle />
      <h1 className="text-4xl font-bold mb-4">TMDB 映画検索</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="タイトルを入力"
          className="mb-4"
        />
        <Button type="submit">検索</Button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <Card key={movie.id}>
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
