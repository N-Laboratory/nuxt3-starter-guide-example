import { describe, expect, test } from 'vitest'
import { fireEvent, render,screen } from '@testing-library/vue'
import Index from '~/pages/index.vue'

describe('Index', () => {
  test('Index page should render page title', () => {
    // Arrange
    render(Index)

    // You need to call trim() because textContent return text with spaces added back and forth.
    const title = screen.getByTestId('page-title')?.textContent?.trim()

    // Assert
    expect(title).toBe('Pages/index.vue')
  })

  test('Input value should emit', async () => {
    // Arrange
    render(Index)
    const input = screen.getByTestId('text-input') as HTMLInputElement

    // Act
    await fireEvent.update(input, 'Test')

    // Assert
    expect(input.value).toBe('Test')
  })
})
