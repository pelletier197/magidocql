import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getPackageManager,
  selectPackageManager,
} from '../../../src/node/packageManager'
import { selectPackageManagerTask } from '../../../src/tasks/all/selectPackageManager'
import { packageManagerMock, taskWrapperMock } from './utils'

vi.mock('../../../src/node/packageManager')

describe('selecting package manager', () => {
  const defaultConfig = {
    packageManager: 'pnpm',
  }

  describe('task is enabled', () => {
    const ctx = {
      packageManager: packageManagerMock(),
    }

    describe('no package manager is specified', () => {
      const noPackageManager = {
        ...defaultConfig,
        packageManager: undefined,
      }

      const availablePackageManager = packageManagerMock()

      beforeEach(() => {
        vi.mocked(selectPackageManager).mockReturnValueOnce(
          Promise.resolve(availablePackageManager),
        )
      })

      it('should select an available package manager', async () => {
        const task = selectPackageManagerTask(noPackageManager)
        await task.executor(ctx, taskWrapperMock())
        expect(ctx.packageManager).toBe(availablePackageManager)
      })

      it('should output the selected package manager', async () => {
        const wrapper = taskWrapperMock()
        const task = selectPackageManagerTask(noPackageManager)
        await task.executor(ctx, wrapper)
        expect(wrapper.output).toHaveBeenCalledWith(
          `Selected ${availablePackageManager.type}`,
        )
      })
    })

    describe('a package manager is specific', () => {
      const packageManager = packageManagerMock()
      const withPackageManager = {
        ...defaultConfig,
        packageManager: 'pnpm' as const,
      }

      beforeEach(() => {
        vi.mocked(getPackageManager).mockReturnValueOnce(packageManager)
      })

      it('should select an available package manager', async () => {
        const task = selectPackageManagerTask(withPackageManager)
        await task.executor(ctx, taskWrapperMock())
        expect(ctx.packageManager).toBe(packageManager)
        expect(getPackageManager).toHaveBeenCalledOnce()
        expect(getPackageManager).toHaveBeenCalledWith(
          withPackageManager.packageManager,
        )
      })

      it('should output the selected package manager', async () => {
        const wrapper = taskWrapperMock()
        const task = selectPackageManagerTask(withPackageManager)
        await task.executor(ctx, wrapper)
        expect(wrapper.output).toHaveBeenCalledWith(
          `Selected ${packageManager.type}`,
        )
      })

      describe('package manager is not pnpm', () => {
        const withPackageManagerNotPnpm = {
          ...withPackageManager,
          type: 'yarn' as const,
        }

        it('should output the selected package manager and a warning', async () => {
          const wrapper = taskWrapperMock()
          const task = selectPackageManagerTask(withPackageManagerNotPnpm)
          await task.executor(ctx, wrapper)
          expect(wrapper.output).toHaveBeenCalledWith(
            `Selected ${packageManager.type}`,
          )
        })
      })
    })
  })
})
