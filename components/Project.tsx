interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export default function Project({ title, description, tags, link }: ProjectProps) {
  return (
    <div
      className={`relative rounded-lg border border-zinc-200 p-6 transition-all dark:border-zinc-800 ${
        link
          ? "cursor-pointer hover:border-[#22c55e] hover:shadow-lg hover:shadow-[#22c55e]/20 hover:-translate-y-1 active:translate-y-0 active:shadow-md"
          : ""
      }`}
    >
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={title}
        />
      )}
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <div className="mb-4 text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
        {description}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-900"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
