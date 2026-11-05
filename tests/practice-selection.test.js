import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getSelectedIds } from '../docs/.vitepress/theme/components/practice-selection.js'

test('no selection preserves all cards', () => {
  assert.equal(getSelectedIds('?type=example'), null)
})
test('explicit empty selection must not expose all questions', () => {
  assert.deepEqual([...getSelectedIds('?ids=,,')], [])
})
test('accepts comma-separated, repeated and encoded IDs, deduplicating exactly', () => {
  assert.deepEqual([...getSelectedIds('?ids=ch4-ex-4-1,%20ch4-pr1&ids=ch4-pr1&ids=a%26b')], ['ch4-ex-4-1', 'ch4-pr1', 'a&b'])
})
test('IDs are exact and do not imply prefixes, ranges or selectors', () => {
  assert.deepEqual([...getSelectedIds('?ids=ch4,1-5,%23card-x')], ['ch4', '1-5', '#card-x'])
})
