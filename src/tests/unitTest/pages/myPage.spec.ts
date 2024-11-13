import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
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
    render(MyPage)
    const title = screen.getByRole('heading', { level: 1 })?.textContent?.trim()

    // Assert
    expect(title).toBe('MyPage')
  })

  test('email and password should be set from store user info.', () => {
    // Arrange
    render(MyPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: { user: { email: 'Initial email', password: 'Initial password' } },
            },
          }),
        ],
      },
    })

    const email = screen.getByText('Email:', { exact: false }).textContent?.trim()
    const password = screen.getByText('Password:', { exact: false }).textContent?.trim()

    // Assert
    expect(email).toBe('Email: Initial email')
    expect(password).toBe('Password: Initial password')
  })
})
