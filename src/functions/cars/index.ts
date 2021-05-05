import { FunctionDefinition } from '@type'
import create from './create'
import find from './find'
import findById from './find-by-id'

export const cars: Record<string, FunctionDefinition> = {
  create,
  find,
  findById
}