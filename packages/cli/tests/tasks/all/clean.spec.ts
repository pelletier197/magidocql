import {
  Listr,
  ListrDefaultRenderer,
  ListrRenderer,
  ListrTaskObject,
  ListrTaskWrapper,
} from 'listr2'
import { describe, expect, it, vi } from 'vitest'
import { cleanTask } from '../../../src/tasks/all/clean'

describe('clean task', () => {
  const defaultConfig = {
    clean: true,
    website: {
      template: 'carbon-multi-page',
      templateVersion: '2.4.0',
      output: 'whatever',
      options: {},
    },
  }

  describe('cleaning is disabled', () => {
    it('should not clean', () => {
      expect(
        cleanTask({
          ...defaultConfig,
          clean: false,
        }).enabled,
      ).toBe(false)
    })
  })

  describe('template is not one of the magidoc template', () => {
    it('should not clean', () => {
      expect(
        cleanTask({
          ...defaultConfig,
          website: {
            ...defaultConfig.website,
            template: 'whatever',
          },
        }).enabled,
      ).toBe(false)
    })
  })

  describe('task is enabled', () => {
    const ctx = {
      tmpArchive: {
        path: 'potato',
        exists: vi.fn(),
        delete: vi.fn(),
      },
      tmpDirectory: {
        path: 'patato',
        exists: vi.fn(),
        delete: vi.fn(),
      },
    }

    it('should clean', () => {
      expect(cleanTask(defaultConfig).enabled).toBe(true)
    })

    it('should delete the archive file', async () => {
      const task = cleanTask(defaultConfig)
      await task.executor(ctx, {
        
      })
      expect(ctx.tmpArchive.delete).toHaveBeenCalledOnce()
    })

    it('should delete the output directory', () => {})
  })
})