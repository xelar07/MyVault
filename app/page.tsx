'use client';

import { useMemo, useState } from 'react';
import FilterBar from '@/components/FilterBar';
import GalleryGrid from '@/components/GalleryGrid';
import actresses from '@/data/actresses.json';

export default function Page() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return actresses.filter(a => {
      const matchesText = [a.name, a.country, ...a.tags].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesTag = tag ? a.tags.includes(tag) : true;
      return matchesText && matchesTag;
    });
  }, [query, tag]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    actresses.forEach(a => a.tags.forEach(t => set.add(t)));
    return Array.from(set);
  }, []);

  return (
    <main className="container">
      <section className="hero">
        <h1>Galería de Actrices Porno</h1>
        <p>Mujeres con un carisma incomparable que inspiran a mujeres de todo el mundo con su pasión y personalidades fuertes. </p>
      </section>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        tags={allTags}
        selectedTag={tag}
        onTagChange={setTag}
      />

      <GalleryGrid items={filtered} />
    </main>
  );
}