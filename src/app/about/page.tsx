import type { Metadata } from "next";
import { siteConfig } from "@/../site.config";
import { getAllTeamMembers, type TeamMember } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { TeamGrid } from "@/components/sections/team-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { Shield, Target, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}, our mission, values, and the experienced team behind our comprehensive accounting services.`,
};

export const revalidate = 60;

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We hold ourselves to the highest ethical standards in everything we do, ensuring your financial information is always handled with care and confidentiality.",
  },
  {
    icon: Target,
    title: "Precision",
    description:
      "Every number matters. Our attention to detail ensures accuracy in all financial reporting, tax filings, and advisory services.",
  },
  {
    icon: Users,
    title: "Client Focus",
    description:
      "We build lasting relationships by understanding your unique needs and delivering personalized solutions that drive real results.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Continuous professional development and adoption of the latest industry practices keep us at the forefront of accounting services.",
  },
];

export default async function AboutPage() {
  let teamMembers: TeamMember[] = [];
  try {
    teamMembers = await getAllTeamMembers();
  } catch {
    // Sanity not populated yet
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
              About {siteConfig.name}
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed">
              For over 25 years, we have been helping individuals and businesses
              navigate the complex world of finance with confidence and clarity.
            </p>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading text-text mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Founded in Hartford, Connecticut, {siteConfig.name} began with a
                  simple mission: to provide exceptional accounting services that
                  go beyond number crunching.
                </p>
                <p>
                  We believe that great financial guidance should be accessible to
                  everyone, from individual taxpayers to growing businesses. Our
                  team combines deep expertise with a personal touch, ensuring
                  every client receives the attention they deserve.
                </p>
                <p>
                  Today, we serve over 500 clients across Connecticut, offering
                  everything from tax preparation and bookkeeping to strategic
                  business advisory and audit services.
                </p>
              </div>
            </div>
            <div className="bg-primary/5 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-6">
                {siteConfig.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-primary font-heading">
                      {stat.value}
                    </div>
                    <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-surface">
        <Container>
          <SectionHeader
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-background rounded-2xl p-6 border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold font-heading text-text mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Preview */}
      {teamMembers.length > 0 && (
        <TeamGrid
          members={teamMembers.slice(0, 4)}
          title="Meet Our Team"
          subtitle="Experienced professionals dedicated to your financial success"
        />
      )}

      <CtaSection
        headline="Ready to Work With Us?"
        subtitle="Contact us today to discuss how we can help with your accounting needs."
        buttonText="Get in Touch"
        buttonHref="/contact"
        phone={siteConfig.phone}
      />
    </>
  );
}
