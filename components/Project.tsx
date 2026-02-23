import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  inProgress?: boolean;
}

export default function Project({ title, description, tags, link, inProgress }: ProjectProps) {
  return (
    <Card
      className={`group relative transition-all ${
        link
          ? "cursor-pointer hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 active:translate-y-0 active:shadow-md"
          : ""
      }`}
    >
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label={title}
        />
      )}
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl group-hover:text-primary transition-colors">
          {title}
          {link && (
            <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          {inProgress && (
            <Badge variant="outline" className="ml-auto text-amber-500 border-amber-500 text-xs font-normal">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse inline-block" />
              In Progress
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
