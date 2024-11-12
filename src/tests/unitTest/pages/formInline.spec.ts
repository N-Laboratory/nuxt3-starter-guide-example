import { beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import userEvent from '@testing-library/user-event'
import Form from '~/pages/formInline.vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Form', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  describe('initial check', () => {
    test('page should render', () => {
      // Arrange
      render(Form)
      const title = screen.getByRole('heading', { level: 1 })?.textContent?.trim()

      // Assert
      expect(title).toBe('Login')
    })

    test('submit button should be disabled', async () => {
      // Arrange
      render(Form)

      await waitFor(() => {
        // Assert
        const isDisabled = (screen.getByRole('button') as HTMLButtonElement).disabled
        expect(isDisabled).toBe(true)
      })
    })
  })

  describe('vee-validate testing', () => {
    test.each([
      ['email'],
      ['password'],
    ])(
      'the %s field is required',
      async (
        inputName,
      ) => {
        // Arrange
        const user = userEvent.setup()
        render(Form)
        const inputElement = screen.getByPlaceholderText(inputName)

        // Act
        await user.type(inputElement, '{Tab}')
        const errorMsg = screen.getByText(`The ${inputName} field is required`)

        // Assert
        expect(errorMsg).toBeTruthy()
      })

    test('the email field should be a valid email', async () => {
      // Arrange
      const user = userEvent.setup()
      render(Form)
      const email = screen.getByPlaceholderText('email')

      // Act
      await user.type(email, 'abc{Tab}')
      const errorMsgWithInvalidValue = screen.getByText('The email field must be a valid email')

      await user.type(email, 'abc@abc.com{Tab}')
      const errorMsgWithValidValue = screen.queryByText('The email field must be a valid email')

      // Assert
      expect(errorMsgWithInvalidValue).toBeTruthy()
      expect(errorMsgWithValidValue).toBeNull()
    })

    test('if all field is valid、submit button should be enabled', async () => {
      // Arrange
      const user = userEvent.setup()
      render(Form)

      // Act
      const email = screen.getByPlaceholderText('email')
      await user.type(email, 'abc@abc.com')

      const password = screen.getByPlaceholderText('password')
      await user.type(password, '123')

      await waitFor(() => {
        // Assert
        const isDisabled = (screen.getByRole('button') as HTMLButtonElement).disabled
        expect(isDisabled).toBe(false)
      })
    })

    test('if click submit button, submission function should run', async () => {
      // Arrange
      const user = userEvent.setup()
      render(Form)

      const email = screen.getByPlaceholderText('email')
      await user.type(email, 'abc@abc.com')

      const password = screen.getByPlaceholderText('password')
      await user.type(password, '123')

      // Act
      await user.click(screen.getByRole('button'))

      await waitFor(() => {
        // Assert
        expect(mockPush).toHaveBeenCalledWith('/myPage')
      })
    })
  })
})
