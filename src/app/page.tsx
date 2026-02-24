import { siteConfig } from "@/../site.config";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold font-heading text-primary">
        {siteConfig.name}
      </h1>
    </div>
  );
}
