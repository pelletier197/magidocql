import { GraphQLField, isNullableType } from 'graphql'
import _ from 'lodash'
import {
  GenerationContext,
  GeneratorConfig,
  GraphQLFactoryContext,
  NullGenerationStrategy,
  QueryType,
} from '../../src'
import { DEFAULT_FACTORIES } from '../../src/generator/defaultFactories'
import { generateArgsForField } from '../../src/generator/fakeGenerator'
import type { Parameter } from '../../src/generator/queryBuilder'

const schema = getTestSchema()

describe('generating fakes for a GraphQL input argument', () => {
  const fieldWithArgs = getQueryField('hasArgs')

  const baseConfig: GeneratorConfig = {
    queryType: QueryType.QUERY,
    factories: {},
    maxDepth: 5,
    nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
  }

  const context: GenerationContext = {
    depth: 3,
    path: 'some.query.path',
  }

  const allArgNames = fieldWithArgs.args.map((arg) => arg.name)

  beforeAll(() => {
    // Ensure we have elements in there
    expect(allArgNames).toHaveLength(15)
  })

  describe('with never null generation strategy', () => {
    const config: GeneratorConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.NEVER_NULL,
    }

    function validateParameterEqualToDefaultFactory(
      name: string,
      result: ReadonlyArray<Parameter>,
    ) {
      const parameter = paramByName(name, result)
      const defaultFactory = _.find(DEFAULT_FACTORIES, (__, key) =>
        name.toLocaleLowerCase().includes(key.toLocaleLowerCase()),
      )
      const defaultValue = defaultFactory
        ? defaultFactory({
            ...context,
            targetName: name.replace('[', '').replace(']', '').replace('!', ''),
          })
        : null

      const isList =
        parameter.type.includes('[') && parameter.type.includes(']')

      if (defaultValue) {
        if (isList) {
          expect(parameter.value).toEqual([defaultValue])
        } else {
          expect(parameter.value).toEqual(defaultValue)
        }
      } else if (isList) {
        expect(parameter.value).toHaveLength(1)
        expect((parameter.value as Array<unknown>)[0]).toBeTruthy()
      } else if (name === 'enum') {
        expect(parameter.value).toBe('RED')
      } else {
        expect(parameter.value).toBeTruthy()
      }
    }

    const result = generateArgsForField(fieldWithArgs, config, context)

    test.each(allArgNames)(
      'should generate the parameter equal to the default factory',
      (arg) => {
        validateParameterEqualToDefaultFactory(arg, result)
      },
    )
  })

  describe('with always null generation strategy', () => {
    const config: GeneratorConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.ALWAYS_NULL,
    }

    function validateParameterIsNullIfNullable(
      name: string,
      result: ReadonlyArray<Parameter>,
    ) {
      const parameter = paramByName(name, result)
      const argument = _.find(fieldWithArgs?.args, (arg) => arg.name === name)

      if (!argument) {
        fail(`expected argument to be defined by name '${name}'`)
      }

      if (isNullableType(argument.type)) {
        expect(parameter.value).toBeNull()
      } else {
        expect(parameter.value).toBeDefined()
      }
    }

    const result = generateArgsForField(fieldWithArgs, config, context)
    test.each(allArgNames)(
      'should generate the parameter %s null if it is nullable',
      (arg) => {
        validateParameterIsNullIfNullable(arg, result)
      },
    )
  })

  describe('with sometimes null generation strategy', () => {
    const config: GeneratorConfig = {
      ...baseConfig,
      nullGenerationStrategy: NullGenerationStrategy.SOMETIMES_NULL,
    }

    function validateParameterIsOccasionallyNullIfNullable(
      name: string,
      result: ReadonlyArray<Parameter>[],
    ) {
      const parameters = result.map((params) => paramByName(name, params))

      const argument = _.find(fieldWithArgs?.args, (arg) => arg.name === name)

      if (!argument) {
        fail(`expected argument to be defined by name '${name}'`)
      }

      if (isNullableType(argument.type)) {
        expect(parameters).toSatisfyAny(
          (item: Parameter) => item.value === null,
        )
        expect(parameters).toSatisfyAny(
          (item: Parameter) => item.value !== null,
        )
      } else {
        expect(parameters).toSatisfyAll(
          (item: Parameter) => item.value !== null,
        )
      }
    }

    const results = _.range(0, 100).map(() =>
      generateArgsForField(fieldWithArgs, config, context),
    )

    test.each(allArgNames)(
      'should generate all nullable parameters occasionally null',
      (arg) => {
        validateParameterIsOccasionallyNullIfNullable(arg, results)
      },
    )
  })

  describe('for a non-nullable type', () => {
    const nonNullField = getQueryField('testNonNull')

    it('should generate the field', () => {
      const result = generateArgsForField(nonNullField, baseConfig, context)
      expect(paramByType('String!', result).value).toBeDefined()
      expect(paramByType('[String!]!', result).value).toBeDefined()
    })
  })

  describe('for non-standard scalars', () => {
    const nonStandardScalarField = getQueryField('hasCustomScalarArg')

    describe('no custom factory is available', () => {
      it('should raise an error', () => {
        try {
          generateArgsForField(nonStandardScalarField, baseConfig, context)
          fail('expected an error to be thrown')
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect((error as Error).message).toContain(
            `Cannot generate a random value for scalar 'SomeCustomScalar'.`,
          )
          expect((error as Error).message).toContain(
            `'SomeCustomScalar': () => generateRandomCustomScalar()`,
          )
        }
      })
    })

    describe('a custom factory is available', () => {
      it('should use the custom factory', () => {
        const expectedOutput = 'Some-output-for-my-scalar'
        const result = generateArgsForField(
          nonStandardScalarField,
          {
            ...baseConfig,
            factories: {
              SomeCustomScalar: () => expectedOutput,
            },
          },
          context,
        )

        expect(paramByType('SomeCustomScalar', result).value).toEqual(
          expectedOutput,
        )
      })
    })
  })

  describe('when providing a custom factory for a type', () => {
    it('should call the custom factory with the right parameters', () => {
      const output = 'testString'
      const outerContext = context
      const factory = jest.fn((context: GraphQLFactoryContext) => {
        expect(context.defaultFactory).toBeDefined()
        expect(context.defaultFactory?.provide()).toBeDefined()

        if (
          context.targetName === 'defaultValueString' ||
          context.targetName === 'defaultValue'
        ) {
          expect(context.defaultValue).toBe('test default value')
        } else {
          expect(context.defaultValue).toBeUndefined()
        }

        expect(context.targetName).toBeDefined()

        expect(context.depth).toBe(outerContext.depth)

        expect(context.path).toStartWith(`${outerContext.path}$`)
        expect(context.path).toSatisfy(
          (path: string) =>
            path.endsWith(`$${context.targetName}`) ||
            path.endsWith(`.${context.targetName}`),
        )

        expect(context.randomFactory).toBeDefined()
        expect(context.randomFactory?.provide()).toBeDefined()

        return output
      })

      generateArgsForField(
        fieldWithArgs,
        {
          ...baseConfig,
          factories: {
            String: factory,
          },
        },
        context,
      )
    })

    describe('for a raw type', () => {
      const output =
        'This is some dope test string that is clearly not hardcoded somewhere else'

      const config: GeneratorConfig = {
        ...baseConfig,
        factories: {
          String: () => output,
        },
      }

      it('should work for direct type', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(paramByType('String', result).value).toEqual(output)
      })

      it('should work for lists', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(paramByType('[String]', result).value).toEqual([output])
      })

      it('should work for nested objects', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        const testInput = paramByType('TestInput', result)

        const value = testInput.value
        expect(value).toBeObject()

        const record = value as Record<string, unknown>
        expect(record['string']).toEqual(output)
        expect(record['listString']).toEqual([output])
      })

      it('should still use the default factory for other types', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        const defaultFactory = DEFAULT_FACTORIES['Float']
        if (!defaultFactory) {
          fail('Expected a default factory for type `Float`')
        }

        const param = paramByType('Float', result)
        expect(param.value).toEqual(
          defaultFactory({
            ...context,
            targetName: param.name,
          }),
        )
      })
    })

    describe('for a glob type', () => {
      const outputString =
        'This is some dope test string that is clearly not hardcoded somewhere else'
      const outputFloat = 45.4
      const outputEnum = 'RED'

      const config: GeneratorConfig = {
        ...baseConfig,
        factories: {
          'Str*': () => outputString,
          '*loat': () => outputFloat,
          '*est*nu*': () => outputEnum,
        },
      }

      it('should work for direct type', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(paramByType('String', result).value).toEqual(outputString)
        expect(paramByType('Float', result).value).toEqual(outputFloat)
        expect(paramByType('TestEnum', result).value).toEqual(outputEnum)
      })

      it('should work for lists', () => {
        const result = generateArgsForField(fieldWithArgs, config, context)
        expect(paramByType('[String]', result).value).toEqual([outputString])
        expect(paramByType('[Float]', result).value).toEqual([outputFloat])
        expect(paramByType('[TestEnum]', result).value).toEqual([outputEnum])
      })
    })
  })
})

function paramByName(
  name: string,
  parameters: ReadonlyArray<Parameter>,
): Parameter {
  const result = _.find(parameters, (item) => item.name === name)
  if (!result) {
    fail(`Expected a parameter named '${name}' in ${parameters.toString()}`)
  }
  return result
}

function paramByType(
  type: string,
  parameters: ReadonlyArray<Parameter>,
): Parameter {
  const result = _.find(parameters, (item) => item.type === type)
  if (!result) {
    fail(`Expected a parameter with type '${type}' in ${parameters.toString()}`)
  }
  return result
}

function getQueryField(name: string): GraphQLField<unknown, unknown, unknown> {
  return getMandatoryField(schema.getQueryType(), name)
}