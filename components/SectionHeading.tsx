import { Separator } from "@/components/ui/separator";

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
      {showSeparator && <Separator className="mt-4" />}
    </div>
  );
}
