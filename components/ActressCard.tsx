// components/ActressCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import CountryFlag from 'react-country-flag';

type Item = { id: string; name: string; slug: string; thumb: string; tags: string[]; country: string; birthday?: string };



// Función para calcular la edad a partir de la fecha de nacimiento en formato DD/MM/YYYY
function getAge(birthday?: string): number | null {
  if (!birthday) return null;
  const [day, month, year] = birthday.split('/').map(Number);
  if (!day || !month || !year) return null;
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function ActressCard({ item }: { item: Item }) {
  return (
    <Link href={`/actrices/${item.slug}`} className="card-link" prefetch={false}>
      <article className="card">
        <div className="media">
          <Image
            src={item.thumb}
            alt={`Retrato de ${item.name}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
            priority={false}
            placeholder="empty"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="meta">
          <h3>{item.name}</h3>
          <p className="muted">
            <CountryFlag
              countryCode={item.country}
              svg
              style={{ width: '1.5em', height: '1.5em', marginRight: 6, verticalAlign: 'middle' }}
              title={item.country}
            />
            {item.birthday ? `${getAge(item.birthday)} años` : ''}
          </p>
        </div>
      </article>
    </Link>
  );
}
