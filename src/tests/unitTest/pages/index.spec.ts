import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/vue'
import Index from '~/pages/index.vue'

describe('Index', () => {
  test('Index page should render page title', () => {
    // Arrange
    const { container } = render(Index)

    // You need to call trim() because textContent return text with spaces added back and forth.
    const title = container.querySelector('[data-testid="page-title"]')?.textContent?.trim()

    // Assert
    expect(title).toBe('Pages/index.vue')
  })
})
