import { beforeEach, describe, expect, test} from 'vitest'
import { render } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import MyPage from '~/pages/myPage.vue'

describe('Mypage', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  test('page should render', () => {
    // Arrange
    const { container } = render(MyPage)

    // You need to call trim() because textContent return text with spaces added back and forth.
    const title = container.querySelector('[data-testid="page-title"]')?.textContent?.trim()

    // Assert
    expect(title).toBe('MyPage')
  })

  test('email and password should be set from store user info.', () => {
    // Arrange
    const { container } = render(MyPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: { user: { email: 'Initial email', password: 'Initial password' } }
            }
          })
        ]
      }
    })

    const email = container.querySelector('[data-testid="page-email"]')?.textContent
    const password = container.querySelector('[data-testid="page-password"]')?.textContent

    // Assert
    expect(email).toBe('Initial email')
    expect(password).toBe('Initial password')
  })
})
