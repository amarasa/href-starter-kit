import { Container } from "@/components/ui/container";

interface Stat {
  /** The numeric or string value displayed prominently */
  value: string;
  /** Descriptive label for the stat */
  label: string;
}

interface StatsBarProps {
  /** Array of statistics to display */
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  if (stats.length === 0) return null;

  return (
    <section
      aria-label="Key statistics"
      className="bg-surface border-y border-border py-12 sm:py-16"
    >
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="text-4xl sm:text-5xl font-bold text-primary font-heading">
                {stat.value}
              </dd>
              <dt className="text-sm text-text-muted font-medium mt-1">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
