import type { Metadata } from "next";
import { siteConfig } from "@/../site.config";
import { getAllTeamMembers, type TeamMember } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { TeamGrid } from "@/components/sections/team-grid";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Our Team",
  description: `Meet the experienced CPAs and accounting professionals at ${siteConfig.name} who are dedicated to your financial success.`,
};

export const revalidate = 60;

export default async function TeamPage() {
  let teamMembers: TeamMember[] = [];
  try {
    teamMembers = await getAllTeamMembers();
  } catch {
    // Sanity not populated yet
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
              Meet Our Team
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed">
              Our team of experienced professionals brings decades of combined
              expertise in accounting, tax strategy, and financial advisory.
            </p>
          </div>
        </Container>
      </section>

      {teamMembers.length > 0 ? (
        <TeamGrid
          members={teamMembers}
          title="Our Professionals"
          subtitle="Each member of our team is committed to delivering exceptional service"
        />
      ) : (
        <section className="py-16">
          <Container>
            <p className="text-text-muted text-center">
              Team members will appear here once content is added to the CMS.
            </p>
          </Container>
        </section>
      )}

      <CtaSection
        headline="Work With Our Experts"
        subtitle="Ready to get started? Reach out to schedule a meeting with one of our team members."
        buttonText="Contact Us Today"
        buttonHref="/contact"
        phone={siteConfig.phone}
      />
    </>
  );
}
