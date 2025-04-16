"use client";

import { useEffect, useState } from "react";
import { Character } from "../types/character";
import { CharacterCard } from "../components/CharacterCard";
import { Filters } from "../components/Filters";
import { Button } from "@/components/ui/button";

interface ApiResponse {
  info: { next: string | null; prev: string | null };
  results: Character[];
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filters, setFilters] = useState({ name: "", status: "", gender: "" });
  const [pageInfo, setPageInfo] = useState<{ next: string | null; prev: string | null }>({
    next: null,
    prev: null,
  });

  const fetchCharacters = async (url?: string) => {
    const base = url ?? `https://rickandmortyapi.com/api/character/?${new URLSearchParams(filters)}`;
    try {
      const res = await fetch(base);
      const data: ApiResponse = await res.json();
      setCharacters(data.results);
      setPageInfo({ next: data.info.next, prev: data.info.prev });
    } catch {
      setCharacters([]);
      setPageInfo({ next: null, prev: null });
    }
  };

  useEffect(() => { fetchCharacters(); }, [filters]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rick & Morty Character Explorer</h1>
      <Filters filters={filters} setFilters={setFilters} />

      {characters.length === 0 ? (
        <p>No characters found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map(char => <CharacterCard key={char.id} character={char} />)}
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <Button onClick={() => pageInfo.prev && fetchCharacters(pageInfo.prev)} disabled={!pageInfo.prev}>
          Prev Page
        </Button>
        <Button onClick={() => pageInfo.next && fetchCharacters(pageInfo.next)} disabled={!pageInfo.next}>
          Next Page
        </Button>
      </div>
    </div>
  );
}