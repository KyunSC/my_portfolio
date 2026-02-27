interface SectionHeadingProps {
  prefix: string;
  highlight: string;
  showSeparator?: boolean;
}

export default function SectionHeading({ prefix, highlight, showSeparator }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold">
        {prefix} <span className="text-primary">{highlight}</span>
      </h2>
      {showSeparator && (
        <div className="mt-4 h-1 w-12 rounded-full bg-primary/60" />
      )}
    </div>
  );
}
