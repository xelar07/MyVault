// components/GalleryGrid.tsx
import ActressCard from './ActressCard';

type Item = { id: string; name: string; thumb: string; tags: string[]; country: string; };

export default function GalleryGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid">
      {items.map(item => (
        <ActressCard key={item.id} item={item} />
      ))}
    </div>
  );
}
