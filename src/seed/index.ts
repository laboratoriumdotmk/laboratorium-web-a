import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  payload.logger.info('Starting seed...')

  // Create admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@laboratorium.mk'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'laboratorium2024'

  const existingUsers = await payload.find({ collection: 'users', where: { email: { equals: adminEmail } } })
  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: { email: adminEmail, password: adminPassword, name: 'Laboratorium Admin', role: 'admin' },
    })
    payload.logger.info(`Admin user created: ${adminEmail}`)
  }

  const ctx = { context: { disableRevalidate: true } }

  // Seed site-settings
  await payload.updateGlobal({
    slug: 'site-settings',
    ...ctx,
    data: {
      siteName: 'Laboratorium',
      contactEmail: 'contact@laboratorium.mk',
      phone: '+389 72 905 555',
      phoneAlt: '+389 2 314 2044',
      address: 'Blvd. Kliment Ohridski 68, 1000 Skopje, North Macedonia',
      hours: 'Mon–Sun (evenings for events)',
      contactPerson: 'Kalina Dukovska',
      instagram: 'https://instagram.com/lab.ratorium',
      facebook: 'https://www.facebook.com/lab.rat.rium/',
      linktree: 'https://linktr.ee/lab.ratorium',
      badges: [
        { name: 'New European Bauhaus Award 2024 Finalist' },
        { name: 'Trans Europe Halles (TEH)' },
        { name: 'European Network of Cultural Centres (ENCC)' },
        { name: 'European Creative Hubs Network (ECHN)' },
      ],
      footerText: 'Лабораторија за убави нешта.',
    },
  })
  payload.logger.info('Site settings seeded')

  // Seed header nav
  await payload.updateGlobal({
    slug: 'header',
    ...ctx,
    data: {
      navItems: [
        { link: { type: 'custom', url: '/', label: 'Home' } },
        { link: { type: 'custom', url: '/spaces', label: 'Spaces' } },
        { link: { type: 'custom', url: '/programs', label: 'Programs' } },
        { link: { type: 'custom', url: '/projects', label: 'Projects' } },
        { link: { type: 'custom', url: '/market', label: 'Market' } },
        { link: { type: 'custom', url: '/news', label: 'News' } },
        { link: { type: 'custom', url: '/get-involved', label: 'Get Involved' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })
  payload.logger.info('Header nav seeded')

  // Seed footer nav
  await payload.updateGlobal({
    slug: 'footer',
    ...ctx,
    data: {
      navItems: [
        { link: { type: 'custom', url: '/spaces', label: 'Spaces' } },
        { link: { type: 'custom', url: '/programs', label: 'Programs' } },
        { link: { type: 'custom', url: '/market', label: 'Market' } },
        { link: { type: 'custom', url: '/contact', label: 'Contact' } },
      ],
    },
  })
  payload.logger.info('Footer nav seeded')

  // Seed spaces
  const spacesData = [
    { name: 'Lab-Factory', slug: 'lab-factory', sizeSqm: 750, use: 'Main stage / main hall', rentable: true },
    { name: 'Lab-Bar & Terrace', slug: 'lab-bar-terrace', sizeSqm: 150, use: 'Small stage + bar/café', rentable: false },
    { name: 'Edu-Lab', slug: 'edu-lab', sizeSqm: 100, use: 'Classroom / workshop room', rentable: true },
    { name: 'Lab-Living Room', slug: 'lab-living-room', sizeSqm: 25, use: 'Exhibition space', rentable: false },
    { name: 'Lab Design Market', slug: 'lab-design-market', use: 'Exhibition hall + community of Macedonian designers & craftspeople (15+ local brands)', rentable: false },
    { name: 'Lab Re:store', slug: 'lab-restore', use: 'Small market for repurposing/upcycling older fashion articles and accessories', rentable: false },
  ]

  for (const space of spacesData) {
    const existing = await payload.find({ collection: 'spaces', where: { slug: { equals: space.slug } } })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'spaces',
        data: space as any,
        ...ctx,
      })
    }
  }
  payload.logger.info('Spaces seeded')

  // Seed events
  const now = new Date()
  const eventsData = [
    {
      title: 'Summer Documentary Night',
      type: 'screening',
      startDateTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      summary: 'An evening of documentary screenings for people spending summer in Skopje.',
      _status: 'published' as const,
    },
    {
      title: 'Open Mic & Jam Session',
      type: 'concert',
      startDateTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      summary: 'Bring your instruments. Leave your ego. Find your bandmates.',
      featured: true,
      _status: 'published' as const,
    },
    {
      title: 'Ceramic Workshop with Local Artisans',
      type: 'workshop',
      startDateTime: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      summary: 'Hands-on ceramic workshop led by makers from Lab Design Market.',
      featured: true,
      _status: 'published' as const,
    },
  ]

  for (const event of eventsData) {
    const slug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
    const existing = await payload.find({ collection: 'events', where: { slug: { equals: slug } } })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'events', data: event as any, ...ctx })
    }
  }
  payload.logger.info('Events seeded')

  // Seed projects
  const projectsData = [
    {
      title: 'Music Ensemble',
      summary: 'Helps young musicians leave the garage and find band-mates, countering the city\'s isolated "micro-cosmos" friend-group culture.',
      projectStatus: 'active',
      _status: 'published' as const,
    },
    {
      title: '"Unnamed" Creative Writing Workshop',
      summary: 'Hosted with Duma in Summa; instructors Marija Boškovska, Ivana Smilevska, and Darko Aleksovski.',
      collaborators: [{ name: 'Duma in Summa' }, { name: 'Marija Boškovska' }, { name: 'Ivana Smilevska' }, { name: 'Darko Aleksovski' }],
      projectStatus: 'active',
      _status: 'published' as const,
    },
    {
      title: 'Summer Multi-Events',
      summary: 'Exhibitions, documentaries, dance parties, and book readings for people spending summer in Skopje; something for all generations.',
      projectStatus: 'active',
      _status: 'published' as const,
    },
    {
      title: 'Craft & Artisan Programs',
      summary: 'Programs run through Lab Design Market & Lab Re:store, supporting Macedonian crafts and offering makers a direct sales channel.',
      projectStatus: 'active',
      _status: 'published' as const,
    },
  ]

  for (const project of projectsData) {
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
    const existing = await payload.find({ collection: 'projects', where: { slug: { equals: slug } } })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'projects', data: project as any, ...ctx })
    }
  }
  payload.logger.info('Projects seeded')

  // Seed vendors
  const vendorsData = [
    {
      name: 'Мајсторски Раце',
      slug: 'majstorski-race',
      craft: 'Ceramics',
      bio: 'Handmade ceramic pieces inspired by Macedonian folk traditions.',
      _status: 'published' as const,
    },
    {
      name: 'Wool & Thread',
      slug: 'wool-and-thread',
      craft: 'Textile Arts',
      bio: 'Contemporary textile art using traditional Macedonian weaving techniques.',
      _status: 'published' as const,
    },
  ]

  for (const vendor of vendorsData) {
    const existing = await payload.find({ collection: 'vendors', where: { slug: { equals: vendor.slug } } })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'vendors', data: vendor as any, ...ctx })
    }
  }
  payload.logger.info('Vendors seeded')

  // Seed a news post
  const postSlug = 'laboratorium-opens-its-doors'
  const existingPost = await payload.find({ collection: 'posts', where: { slug: { equals: postSlug } } })
  if (existingPost.docs.length === 0) {
    await payload.create({
      collection: 'posts',
      data: {
        title: 'Laboratorium Opens Its Doors',
        excerpt: 'After months of preparation, the former Nova Makedonija print house has been transformed into Skopje\'s newest cultural hub.',
        category: 'announcement',
        publishedAt: new Date('2024-12-01').toISOString(),
        _status: 'published' as const,
        body: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: 'Laboratorium is officially open. Located in the former print house of Nova Makedonija on Blvd. Kliment Ohridski 68, our center brings together artists, designers, makers, and community builders under one roof.' }],
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      } as any,
      ...ctx,
    })
  }
  payload.logger.info('News post seeded')

  // Seed About page
  const aboutSlug = 'about'
  const existingAbout = await payload.find({ collection: 'pages', where: { slug: { equals: aboutSlug } } })
  if (existingAbout.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'About Laboratorium',
        slug: aboutSlug,
        _status: 'published' as const,
        layout: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Laboratorium is a free cultural-educational center in Skopje — "a laboratory of beautiful things" — where artists, designers, makers, and young creatives meet, learn, experiment, and build community.' }],
                    version: 1,
                  },
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Founded in December 2024, we are housed in the cavernous former print house of Nova Makedonija. Since opening, we have hosted 180+ events with the support of 80+ partner organizations.' }],
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
          {
            blockType: 'pillars',
            heading: 'What We Do',
            pillars: [
              { icon: '◉', title: 'Community & Creative Space', description: 'A free, welcoming, multi-use space where future artists and creators meet, exchange ideas, and create together.' },
              { icon: '◎', title: 'Incubator for Social Projects', description: 'Events and initiatives aimed at improving the cultural and social environment, especially engaging young people.' },
              { icon: '⚗', title: 'Craft & Design Revival', description: 'Reviving fading Macedonian crafts, making them attractive to young people, and offering makers a direct sales channel.' },
            ],
          },
          {
            blockType: 'badges',
            heading: 'Recognition & Networks',
            badges: [
              { name: 'New European Bauhaus Award 2024 Finalist (600+ European projects)' },
              { name: 'Trans Europe Halles (TEH)' },
              { name: 'European Network of Cultural Centres (ENCC)' },
              { name: 'European Creative Hubs Network (ECHN)' },
            ],
          },
        ],
      } as any,
      ...ctx,
    })
  }
  payload.logger.info('About page seeded')

  payload.logger.info('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
