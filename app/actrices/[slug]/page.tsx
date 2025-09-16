// app/actrices/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import actresses from '@/data/actresses.json';
import scenes from '@/data/scenes.json';
import type { Metadata } from 'next';

type Actress = {
  id: string;
  name: string;
  slug: string;
  thumb: string;
  profile: string;
  country: string;
  tags: string[];
  alt?: string;
  description?: string;
};

export async function generateStaticParams() {
  return (actresses as Actress[]).map(a => ({ slug: a.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const actress = (actresses as Actress[]).find((a) => a.slug === params.slug);
  if (!actress) notFound();

  const filmography = (scenes as any[]).filter((s) => (s.cast || []).includes(params.slug))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <main style={{ background: '#000', minHeight: '100vh', padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '2.5rem', marginBottom: 48 }}>
        <div style={{ flex: '0 0 700px', maxWidth: 700, width: 700, height: 480, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 16, margin: '0 auto' }}>
          <Image
            src={actress.profile}
            alt={actress.alt || `Retrato de ${actress.name}`}
            width={700}
            height={480}
            style={{ objectFit: 'cover', borderRadius: 16, width: 700, height: 480, background: '#222' }}
            priority
          />
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 32, maxWidth: 900 }}>
          <hr style={{ border: 'none', borderTop: '3px solid #fff', margin: '1px 0 0 0' }} />
          <h1 style={{ color: '#fff', fontSize: 30, fontWeight: 700, margin: 0, lineHeight: 1.1, textAlign: 'left' }}>{actress.name}</h1>
          <hr style={{ border: 'none', borderTop: '3px solid #fff', margin: '0 0 1px 0' }} />
          <p style={{ color: '#fff', fontSize: 20, margin: 0, lineHeight: 1.5, textAlign: 'justify' }}>{actress.description || 'Sin descripción.'}</p>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '3px solid #fff', margin: '32px 0 0 0' }} />
      <h2 style={{ color: '#fff', textAlign: 'center', fontSize: 30, textDecoration: 'none', margin: '16px 0 0 0', letterSpacing: 1, fontWeight: 700 }}>Latest {actress.name} Videos</h2>
      <hr style={{ border: 'none', borderTop: '3px solid #fff', margin: '0 0 32px 0' }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        justifyContent: 'center',
        maxWidth: 1700,
        margin: '0 auto',
        alignItems: 'stretch'
      }}>
        {filmography.map((sc) => (
          <div key={sc.id} style={{ background: '#181818', borderRadius: 12, minWidth: 0, maxWidth: 520, minHeight: 340, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', fontWeight: 700, fontSize: 20, color: '#fff', textAlign: 'left', padding: 0, boxShadow: '0 2px 12px #0003', border: '1px solid #222' }}>
            <div style={{ width: '100%', height: 292, borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {sc.cover && (
                <Image
                  src={sc.cover}
                  alt={`Portada: ${sc.title}`}
                  width={520}
                  height={292}
                  style={{ objectFit: 'cover', width: '100%', height: 292, background: '#222' }}
                />
              )}
            </div>
            <div style={{ padding: '18px 18px 10px 18px', width: '100%' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 8 }}>{sc.title}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', fontSize: 16, color: '#3af', fontWeight: 500 }}>
                {sc.cast && Array.isArray(sc.cast) && sc.cast.length > 0 && (
                  <span>{sc.cast.join(' & ')}</span>
                )}
                {sc.date && (
                  <span style={{ marginLeft: 16 }}>{new Date(sc.date).toLocaleDateString()}</span>
                )}
                {sc.rating && (
                  <span style={{ marginLeft: 16 }}>★ {sc.rating}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = (actresses as any[]).find((x) => x.slug === params.slug);
  if (!a) return { title: 'Actriz no encontrada' };
  return {
    title: `${a.name} | Galería`,
    description: `Perfil y filmografía de ${a.name}.`,
    openGraph: { images: [a.profile] }
  };
}
