import { site } from "@/content/site";

/** Placeholder until the grid lands in step 3. */
export default function HomePage() {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-ui text-muted">step 2 of 6 · tokens and UI components</p>
        <h1 className="text-5xl font-bold tracking-tight">Hi, I&apos;m {site.firstName}.</h1>
        <p className="text-xl text-muted">{site.tagline}</p>
      </div>
    </main>
  );
}
