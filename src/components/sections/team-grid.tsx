import Image from "next/image";
import type { TeamMember } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "./section-header";

interface TeamGridProps {
  /** Array of team members to display */
  members: TeamMember[];
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function TeamGrid({
  members,
  title = "Meet Our Team",
  subtitle,
}: TeamGridProps) {
  if (members.length === 0) return null;

  return (
    <section
      aria-labelledby="team-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <article
              key={member._id}
              className="bg-surface border border-border rounded-2xl overflow-hidden"
            >
              {/* Photo or initials fallback */}
              <div className="relative aspect-[3/4] w-full bg-primary/5">
                {member.photo?.asset?._ref ? (
                  <Image
                    src={urlFor(member.photo).width(600).height(800).url()}
                    alt={`Portrait of ${member.name}`}
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-primary/10"
                    aria-hidden="true"
                  >
                    <span className="text-4xl font-bold text-primary/40 font-heading">
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold font-heading text-text">
                  {member.name}
                </h3>

                <p className="text-sm text-text-muted mt-0.5">
                  {member.title}
                </p>

                {/* Credentials badges */}
                {member.credentials && member.credentials.length > 0 && (
                  <div
                    className="flex flex-wrap gap-1.5 mt-3"
                    aria-label={`Credentials: ${member.credentials.join(", ")}`}
                  >
                    {member.credentials.map((credential) => (
                      <span
                        key={credential}
                        className="bg-primary/10 text-primary text-xs font-medium rounded-full px-2 py-0.5"
                      >
                        {credential}
                      </span>
                    ))}
                  </div>
                )}

                {member.bio && (
                  <p className="text-sm text-text-muted leading-relaxed mt-3 line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
