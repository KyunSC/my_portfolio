interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export default function Project({ title, description, tags, link }: ProjectProps) {
  const Container = link ? 'a' : 'div';
  const linkProps = link ? {
    href: link,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <Container
      {...linkProps}
      className="rounded-lg border border-zinc-200 p-6 transition-all hover:shadow-lg dark:border-zinc-800 block"
    >
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
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
    </Container>
  );
}
