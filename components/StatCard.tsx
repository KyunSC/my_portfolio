import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <Card className="text-center p-6 transition-all hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5">
      <CardContent className="p-0">
        {icon && (
          <div className="flex justify-center mb-2 text-primary">
            {icon}
          </div>
        )}
        <p className="text-4xl font-bold text-primary">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
