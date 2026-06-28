// Renders one or more schema.org JSON-LD blocks. Server-safe (no hooks), so it
// can be dropped into any server component. Each object should already include
// its own "@context": "https://schema.org".

export default function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
