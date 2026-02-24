import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  /** Primary headline displayed prominently */
  headline: string;
  /** Supporting text below the headline */
  subtitle: string;
  /** Primary call-to-action button */
  primaryCta: HeroCta;
  /** Secondary call-to-action button */
  secondaryCta: HeroCta;
  /** Trust badges displayed in a row below the CTAs */
  stats?: HeroStat[];
}

export function Hero({
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
}: HeroProps) {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Background gradient with subtle pattern overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight">
            {headline}
          </h1>

          <p className="mt-6 text-xl text-white/80 max-w-2xl leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href={primaryCta.href}
              variant="secondary"
              size="lg"
            >
              {primaryCta.label}
            </Button>

            <Button
              href={secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 hover:text-white active:bg-white/20 active:text-white"
            >
              {secondaryCta.label}
            </Button>
          </div>

          {stats && stats.length > 0 && (
            <div
              className="mt-14 flex flex-wrap gap-x-10 gap-y-4"
              role="list"
              aria-label="Key statistics"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3" role="listitem">
                  <span className="text-2xl sm:text-3xl font-bold text-accent font-heading">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/70 leading-tight max-w-[120px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
