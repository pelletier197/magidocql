import path from 'path'
import { fileURLToPath } from 'url'

function relativePath(target) {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), target)
}

function websiteConfig(website) {
  if (website === 'first') {
    return {
      appTitle: 'AniList',
      graphqlUrl: 'https://graphql.anilist.co/',
      siteRoot: '/anilist',
      factories: {
        Json: {},
        CountryCode: 'CA',
        FuzzyDateInt: 1234567890,
      },
    }
  } else if (website === 'second') {
    return {
      appTitle: 'GraphiQL Demo',
      graphqlUrl: 'https://countries.trevorblades.com/',
      siteRoot: '/graphiql-demo',
      factories: {
        _Any: 'anything',
      },
    }
  } else {
    throw new Error(`Unknown website: ${WEBSITE}`)
  }
}

export function allConfigs() {
  return [websiteConfig('first'), websiteConfig('second')]
}

const config = websiteConfig(process.env.WEBSITE || 'first')

const otherLinks = allConfigs().filter(
  (current) => current.siteRoot !== config.siteRoot,
)

export default {
  introspection: {
    type: 'url',
    url: config.graphqlUrl,
  },
  website: {
    template: 'carbon-multi-page',
    output: relativePath(`./website${config.siteRoot}`),
    options: {
      appTitle: config.appTitle,
      siteRoot: config.siteRoot,
      siteMeta: {
        description: `Magidoc demo for multi-schema website for ${config.appTitle}.`,
        'og:description': `Magidoc demo for multi-schema website for ${config.appTitle}.`,
      },
      externalLinks: otherLinks.map((current) => ({
        href: current.siteRoot,
        label: current.appTitle,
        group: 'Other Schemas',
      })),
      pages: [
        {
          title: 'Congratulations',
          content: `
# Congratulations from ${config.appTitle} 🎉

You've successfully created a multi-schema website with Magidoc! You are now watching the page of \`${config.appTitle}\`. If you want, feel free to look out the other schemas by clicking on the square icon on the top right of this website.
          `,
        },
      ],
      queryGenerationFactories: config.factories,
    },
  },
}
