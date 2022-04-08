var e=`---
title: GraphQL Query Generator
since: 1.0.0
tags: ['standalone', 'plugin', 'node', 'browser']
---

> Info: This plugin is a standalone plugin and can be used outside of Magidoc. It was built to be used both in a browser environment and with NodeJS.

The GraphQL Query Generator plugin does exactly as its name suggests: it automatically build GraphQL queries and variables from a root query type. Generating GraphQL queries requires complex logic that is abstracted by the generator.

## Example

Here is a sample generated query using the plugin. It supports parameter generation, duplicate names, union types and many other things.

**Query**

\`\`\`graphql
query getPerson($delay: Int, $delay2: Int) {
  person {
    name
    age(delay: $delay)
    friends {
      name
      age(delay: $delay2)
    }
  }
}
\`\`\`

**Variables**

\`\`\`json
{
  "delay": 20,
  "delay2": 20
}
\`\`\`

## Install

This plugin requires [GraphQL.js](https://www.npmjs.com/package/graphql) as peer dependency.

\`\`\`bash
pnpm install -D @magidoc/plugin-query-generator graphql
\`\`\`

## Usage

Here is a sample usage of the query generator using TypeScript that would generate the [above query](#example). Note that this plugin can be used from Svelte applications as well.

\`\`\`typescript
import generateGraphQLQuery, {
  NullGenerationStrategy,
  QueryType,
} from '@magidoc/plugin-query-generator'
import { buildClientSchema, type IntrospectionQuery } from 'graphql'
import schemaJson from '_schema.json'

// Use GraphQL.js to build the schema
const schema = buildClientSchema(schemaJson as unknown as IntrospectionQuery)
const personField = schema.getQueryType()?.getFields()['person']!!

// Generates query for the \`person\` field
const result = generateGraphQLQuery(personField, {
  queryName: 'getPerson',
  queryType: QueryType.QUERY,
  maxDepth: 3,
  nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
  factories: {},
})

console.log(result)
\`\`\`

## Factories

Factories is the most important part of the available configuration. It allows to customize how the plugin will generate the random values used as [query variables](https://graphql.org/learn/queries/#variables). The plugin offers many [default factories](https://github.com/pelletier197/magidoc/blob/main/packages/plugins/query-generator/src/generator/defaultFactories.ts). Each of these factories can be overwritten and custom ones can be added.

Factories can be used to provide custom generators for [scalar types](https://graphql.org/learn/schema/#scalar-types) and [input values](https://graphql.org/learn/schema/#input-types).

### Custom scalar types

Many GraphQL APIs implement [custom scalars](https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/). Since the plugin cannot automatically determine what is backing these scalars, a custom factory is required for them.

For instance, given schema has a scalar named \`OddNumber\`, representing any odd number.

\`\`\`graphql
scalar OddNumber
\`\`\`

The factory below could be provided.

\`\`\`typescript
const result = generateGraphQLQuery(field, {
  factories: {
    OddNumber: () => 5,
  },
})
\`\`\`

### Factory key

The key for the GraphQL factory object uses glob syntax to determine which factory to use. The factories are used in order of specificity, from the most specific to the least specific. Only the most specific factory will be used to generate the value.

Here is a set of examples of factories going from the most specific to the least specific.

\`\`\`typescript
const result = generateGraphQLQuery(field, {
  factories: {
    '[OddNumber!]!': () => [5],
    '[OddNumber!]': () => [7],
    'OddNumber!': () => 9,
    OddNumber: () => 11,
    '*Number': () => 13,
  },
})
\`\`\`

#### Type unwrapping

The query generator uses type unwrapping to try to find a factory in all the provided values. This means that you generally don't need to provide a factory for a \`[OddNumber!]!\`, because a factory \`OddNumber\` will be used for all possible wrapping of the type: \`OddNumber\`, \`OddNumber!\`, \`[OddNumber!]\` and \`[OddNumber!]!\`.

### Factory context

Some GraphQL types, like \`String\`, are used widely within most GraphQL APIs. It can be desired to return a different value for this field based on the context where this type is used. This can be achieved using the \`context\` parameter provided in the factory function.

\`\`\`typescript
import generateGraphQLQuery, { type QueryType } from '@magidoc/plugin-query-generator'
const result = generateGraphQLQuery(field, {
  factories: {
    String: (context: GraphQLFactoryContext) => {
      switch(context.targetName.toLowerCase()) {
        case: 'email':
          return 'some-email@mycompany.com'
        case: 'policyName'
          return 'Policy Name'
        default: context.defaultFactory ? context.defaultFactory.provide() : 'abc'
      }
    },
  },
})
\`\`\`

The available parameters and their description can be found here

<!-- prettier-ignore -->
| Parameter      | Description |
|----------------|-------------|
| targetName     | Either the argument name or the nested field name. |
| defaultValue   | The default value provided by the GraphQL schema. By default, the default value provided in the schema is not used, but you can decide to use it by providing a factory that returns the default value if it exists. |
| defaultFactory | The default factory that exists for this type. Can be useful if you want to perform custom actions and fallback to the default provider. Note that this factory is always the factory for a scalar value. Thus, if you create a factory for a \`[String!]!\`, then the default factory will return a String, not an array of strings. You will be required to return an array yourself. This property is only available when overriding the default generators. |
| randomFactory  | The random factory that would be used to generate this object. This can be useful to fallback on a random object. This is only available when generating input values. |
| depth          | The current depth in the field generation. This does not include the depth of the current parameter. |
| path           | Path in the query to the current parameter. |
`;export{e as default};
