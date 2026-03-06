import { describe, it, expect } from 'vitest'
import { cn, truncate, parseError } from '@utils/index'

describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('deduplicates tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})

describe('truncate()', () => {
  it('returns original string if shorter than max', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('truncates with ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })
})

describe('parseError()', () => {
  it('parses Error instance', () => {
    expect(parseError(new Error('boom'))).toBe('boom')
  })

  it('parses string error', () => {
    expect(parseError('oops')).toBe('oops')
  })

  it('returns fallback for unknown', () => {
    expect(parseError(null)).toBe('An unexpected error occurred')
  })
})
