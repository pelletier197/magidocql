import { existsSync } from 'fs'
import type { MagidocConfiguration } from './types'
import path from 'path'
import {pathToFileURL} from 'url'
import { parseConfiguration } from './parser'

const allowedExtensions = ['.js', '.cjs', '.mjs']

export async function readConfiguration(
  configPath: string,
): Promise<MagidocConfiguration> {
  const extension = path.extname(configPath)
  if (!isValidJsExtension(extension)) {
    throw new Error(
      `Unrecognized Magidoc configuration file extension: ${extension}...  Supported values are ${allowedExtensions.toString()}`,
    )
  }

  if (!existsSync(configPath)) {
    throw new Error(
      `Could not find Magidoc configuration file at path ${configPath}.`,
    )
  }

  const config = ((await import(pathToFileURL(configPath).toString())) as { default?: unknown }).default
  if (!config) {
    throw new Error(`File ${configPath} has no default export`)
  }

  return parseConfiguration(config)
}

export function isValidJsExtension(extension: string): boolean {
  const lower = extension.toLocaleLowerCase()
  return allowedExtensions.includes(lower)
}
