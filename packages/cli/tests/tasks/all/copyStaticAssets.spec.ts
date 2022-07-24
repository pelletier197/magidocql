import { describe, expect, it, vi } from 'vitest'
import { copyStaticAssetsTask } from '../../../src/tasks/all/copyStaticAssets'
import { copyStaticAssets } from '../../../src/template/assets'
import { taskWrapperMock } from './utils'

vi.mock('../.././../src/template/assets', () => ({
  copyStaticAssets: vi.fn(),
}))

describe('copy static assets task', () => {
  const defaultConfig = {
    website: {
      template: 'carbon-multi-page',
      templateVersion: '2.4.0',
      output: 'whatever',
      staticAssets: 'whatever/**/*',
      options: {},
    },
  }

  const ctx = {
    templateConfiguration: {
      supportedOptions: [],
      schemaTargetLocation: 'target/location',
      staticAssetsLocation: 'static/assets',
      envFileLocation: 'env/file',
    },
  }

  describe('template has no static assets', () => {
    const noAssets = {
      ...defaultConfig,
      website: {
        ...defaultConfig.website,
        staticAssets: undefined,
      },
    }

    it('should not enable task', () => {
      expect(copyStaticAssetsTask(noAssets).enabled).toBe(false)
    })

    it('should not copy anything when executing', async () => {
      await copyStaticAssetsTask(noAssets).executor(ctx, taskWrapperMock())
      expect(copyStaticAssets).not.toHaveBeenCalled()
    })
  })

  describe('task is enabled', () => {
    it('should copy assets', () => {
      expect(copyStaticAssetsTask(defaultConfig).enabled).toBe(true)
    })

    it('should copy the static assets', async () => {
      const task = copyStaticAssetsTask(defaultConfig)
      await task.executor(ctx, taskWrapperMock())
      expect(copyStaticAssets).toHaveBeenCalledOnce()
      expect(copyStaticAssets).toHaveBeenCalledWith(
        defaultConfig.website.staticAssets,
        ctx.templateConfiguration.staticAssetsLocation,
      )
    })
  })
})
