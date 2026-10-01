import { Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { installationScenes } from '@/components/graphics/Scene'
import { installationTypes, projects } from '@/content/projects'

type GalleryProps = {
  /** `preview` trims the grid and links through to the Projects page. */
  variant?: 'preview' | 'full'
  tone?: 'light' | 'warm' | 'tint'
}

/**
 * Renders real projects when `src/content/projects.ts` has entries, and the
 * installation-type gallery until then. Nothing here implies a project history
 * that has not been supplied — the copy describes what we design and install.
 */
export function Gallery({ variant = 'full', tone = 'light' }: GalleryProps) {
  const hasProjects = projects.length > 0
  const preview = variant === 'preview'

  if (hasProjects) {
    const items = preview ? projects.slice(0, 6) : projects
    return (
      <Section id="projects" tone={tone} spacing="default">
        <SectionHeading
          eyebrow="Projects"
          title="Installations we have delivered"
          lead="A selection of solar installations designed, installed and commissioned by our team."
        />

        <ul className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => (
            <Reveal as="li" key={project.id} delay={(index % 3) * 80}>
              <figure className="group overflow-hidden rounded-[4px] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="aspect-[8/5] overflow-hidden bg-navy-50">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="p-5 sm:p-6">
                  <p className="eyebrow text-gold-600">{project.type}</p>
                  {project.name && (
                    <h3 className="mt-2 font-display text-[1.0625rem] font-bold text-navy-700">
                      {project.name}
                    </h3>
                  )}
                  {(project.location || project.capacity) && (
                    <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[0.875rem] text-body">
                      {project.location && (
                        <div className="flex gap-1.5">
                          <dt className="text-slate-muted">Location:</dt>
                          <dd className="font-medium text-navy-700">{project.location}</dd>
                        </div>
                      )}
                      {project.capacity && (
                        <div className="flex gap-1.5">
                          <dt className="text-slate-muted">Capacity:</dt>
                          <dd className="font-medium text-navy-700">{project.capacity}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        {preview && (
          <Reveal className="mt-12 flex justify-center">
            <Button to="/projects" variant="secondary" withArrow>
              View all projects
            </Button>
          </Reveal>
        )}
      </Section>
    )
  }

  /* ---- No project data supplied: show what we design and install instead ---- */

  const items = preview ? installationTypes.slice(0, 3) : installationTypes

  return (
    <Section id="projects" tone={tone} spacing="default">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Installations"
          title="The systems we design and install"
          lead="Every site has its own constraints — roof type, available area, shading and load. These are the configurations we work with most often."
          className="lg:max-w-xl"
        />
        {preview && (
          <Reveal delay={90} className="shrink-0">
            <Button to="/projects" variant="secondary" withArrow>
              See all installation types
            </Button>
          </Reveal>
        )}
      </div>

      <ul className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {items.map((item, index) => {
          const Scene = installationScenes[item.graphic]
          return (
            <Reveal as="li" key={item.id} delay={(index % 3) * 80} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white shadow-card transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
                <div className="aspect-[8/5] overflow-hidden bg-navy-50">
                  <Scene className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.0625rem] font-bold text-navy-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-body">{item.description}</p>
                </div>
              </article>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
