import { newTask, GenerateTask } from '../task'
import type { GenerationConfig } from '../config'
import { getVersion } from '../../../version'
import { isTemplate } from '../../../template'

export function warnVersionTask(config: GenerationConfig): GenerateTask {
  return newTask({
    title: `Template version warning`,
    enabled:
      config.website.templateVersion !== getVersion() &&
      isTemplate(config.website.template),
    executor: (_, task) => {
      task.output =
        '⚠️ Template version has been set to a different version that the current CLI version.\n⚠️ This may result in unexpected results.'
    },
  })
}