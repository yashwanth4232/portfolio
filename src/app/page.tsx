import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
// Uncomment when Projects section is built:
// import { Projects } from "@/components/sections/Projects";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />

        {/* Projects section — placeholder until Projects.tsx is built */}
        {/* Replace this entire block with <Projects /> */}
        <section
          id="work"
          aria-label="Projects"
          style={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBlock: "var(--section-padding-y)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-tertiary)",
              fontSize: "0.8125rem",
              letterSpacing: "0.08em",
            }}
          >
            Projects section — replace with &lt;Projects /&gt;
          </p>
        </section>

        <Experience />
        <Contact />
      </main>
    </>
  );
}
