import React, { Fragment } from 'react'
import { RichText } from '@/components/RichText'
import { Motif } from '@/components/Motif'
import Link from 'next/link'

const HeroBlock: React.FC<any> = ({ heading, richText }) => (
  <div className="mb-12">
    {heading && <h2 className="text-3xl md:text-4xl mb-6">{heading}</h2>}
    {richText && (
      <div className="prose prose-lg max-w-none">
        <RichText data={richText} />
      </div>
    )}
  </div>
)

const RichTextBlockComponent: React.FC<any> = ({ content }) => (
  <div className="prose prose-lg max-w-none">
    <RichText data={content} />
  </div>
)

const ImageBlockComponent: React.FC<any> = ({ caption, size }) => (
  <div className={`${size === 'small' ? 'max-w-md' : size === 'medium' ? 'max-w-2xl' : 'w-full'}`}>
    <div className="bg-cream-dark halftone aspect-[16/9] flex items-center justify-center">
      <span className="font-mono text-xs text-muted">[Image placeholder]</span>
    </div>
    {caption && <p className="font-mono text-xs text-muted mt-2">{caption}</p>}
  </div>
)

const ImageGalleryBlock: React.FC<any> = ({ images, style }) => (
  <div className={`grid gap-4 ${style === 'grid' ? 'grid-cols-2 md:grid-cols-3' : style === 'masonry' ? 'columns-2 md:columns-3' : 'grid-cols-2 md:grid-cols-4'}`}>
    {(images || []).map((_: any, i: number) => (
      <div key={i} className={`bg-cream-dark halftone aspect-square flex items-center justify-center ${style === 'collage' && i % 3 === 0 ? 'col-span-2 row-span-2' : ''}`}>
        <span className="font-mono text-xs text-muted">[Image]</span>
      </div>
    ))}
  </div>
)

const CtaBlock: React.FC<any> = ({ heading, text, link }) => (
  <div className="bg-cream-dark border border-rule p-8 md:p-12 text-center">
    {heading && <h2 className="text-2xl md:text-3xl mb-4">{heading}</h2>}
    {text && <p className="text-muted max-w-xl mx-auto mb-6">{text}</p>}
    {link?.url && (
      <Link
        href={link.url}
        className="inline-block font-mono text-xs tracking-wider uppercase bg-ink text-cream px-6 py-3 hover:bg-accent transition-colors no-underline"
      >
        {link.label || 'Learn more'} →
      </Link>
    )}
  </div>
)

const PillarsBlock: React.FC<any> = ({ heading, pillars }) => (
  <div>
    {heading && <h2 className="text-2xl md:text-3xl mb-8">{heading}</h2>}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {(pillars || []).map((p: any, i: number) => (
        <div key={i}>
          {p.icon && <span className="text-accent text-2xl block mb-3">{p.icon}</span>}
          <h3 className="text-xl mb-2">{p.title}</h3>
          <p className="text-sm text-muted">{p.description}</p>
        </div>
      ))}
    </div>
  </div>
)

const BadgesBlock: React.FC<any> = ({ heading, badges }) => (
  <div>
    {heading && <h3 className="font-mono text-xs tracking-wider uppercase text-muted mb-4">{heading}</h3>}
    <div className="flex flex-wrap gap-3">
      {(badges || []).map((b: any, i: number) => (
        <span key={i} className="font-mono text-xs border border-rule px-3 py-2">{b.name}</span>
      ))}
    </div>
  </div>
)

const ContactInfoBlock: React.FC<any> = ({ heading }) => (
  <div>
    {heading && <h2 className="text-2xl mb-4">{heading}</h2>}
    <p className="text-muted">
      See the <a href="/contact" className="text-accent">contact page</a> for full details.
    </p>
  </div>
)

const blockComponents: Record<string, React.FC<any>> = {
  hero: HeroBlock,
  richText: RichTextBlockComponent,
  image: ImageBlockComponent,
  imageGallery: ImageGalleryBlock,
  cta: CtaBlock,
  pillars: PillarsBlock,
  badges: BadgesBlock,
  contactInfo: ContactInfoBlock,
}

export const RenderBlocks: React.FC<{ blocks: any[] }> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null
        return (
          <div className="my-12" key={index}>
            <Component {...block} />
          </div>
        )
      })}
    </Fragment>
  )
}
