import { vi, describe, expect, test, afterEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { useFetch } from '@vueuse/core'
import { waitPerfectly } from '../setup'
import Index from '~/pages/index.vue'

vi.useFakeTimers()

vi.mock('@vueuse/core', () => {
  return {
    useFetch: vi.fn(),
  }
})

describe('Index', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

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

  test('UUID should get', async () => {
    // Arrange
    vi.mocked(useFetch).mockImplementation(
      vi.fn().mockReturnValue({
        json: vi.fn().mockReturnValue({
          data: ref({ uuid: 'Test uuid' }),
        }),
      }),
    )
    render(Index)
    const uuidBtn = screen.getByText('Get uuid')

    // Act
    await fireEvent.click(uuidBtn)
    await waitPerfectly()

    // Assert
    expect(screen.getByText('UUID = Test uuid')).toBeDefined()
  })
})
