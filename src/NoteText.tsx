// Render only authored emphasis, never HTML from the content catalog.
export function NoteText({ text }: { text: string }) {
  return <>{text.split(/(\*\*_[^_]+_\*\*|\*\*[^*]+\*\*|_[^_]+_)/g).map((part, index) => {
    if (part.startsWith('**_') && part.endsWith('_**')) return <strong key={index}><em>{part.slice(3, -3)}</em></strong>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('_') && part.endsWith('_')) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  })}</>;
}
