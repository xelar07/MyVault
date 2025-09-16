// components/FilterBar.tsx
type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  tags: string[];
  selectedTag: string | null;
  onTagChange: (v: string | null) => void;
};

export default function FilterBar({ query, onQueryChange, tags, selectedTag, onTagChange }: Props) {
  return (
    <div className="filterBar">
      <input
        className="input"
        placeholder="Buscar nombre, país, estilo…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <div className="tags">
        <button
          className={`tag ${selectedTag === null ? 'active' : ''}`}
          onClick={() => onTagChange(null)}
        >
          Todos
        </button>
        {tags.map(t => (
          <button
            key={t}
            className={`tag ${selectedTag === t ? 'active' : ''}`}
            onClick={() => onTagChange(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
