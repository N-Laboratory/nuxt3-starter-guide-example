import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { waitPerfectly } from '../setup'
import Form from '~/pages/formScript.vue'

vi.useFakeTimers()

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Form', () => {
  describe('initial check', () => {
    beforeEach(() => {
      // creates a fresh pinia and make it active so it's automatically picked
      // up by any useStore() call without having to pass it to it:
      // `useStore(pinia)`
      setActivePinia(createPinia())
    })

    test('page should render', () => {
      // Arrange
      render(Form)

      // You need to call trim() because textContent return text with spaces added back and forth.
      const title = screen.getByTestId('page-title')?.textContent?.trim()

      // Assert
      expect(title).toBe('Login')
    })

    test('submit button should be disabled', async () => {
      // Arrange
      render(Form)

      // You have to call flushPromises after render() called because HTMLButtonElement.disabled always return false in the initial state.
      await waitPerfectly()
      const isDisabled = (screen.getByTestId('submit-btn') as HTMLButtonElement).disabled

      // Assert
      expect(isDisabled).toBeTruthy()
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
        render(Form)
        const inputElement = screen.getByTestId(`input-${inputName}`) as HTMLInputElement

        // Act
        await fireEvent.update(inputElement, '')
        await waitPerfectly()
        const errorMsg = screen.getByTestId(`${inputName}-error-msg`)?.textContent

        // Assert
        expect(errorMsg).toBe(`The ${inputName} field is required`)
      })

    test('the email field should be a valid email', async () => {
      // Arrange
      render(Form)
      const inputElement = screen.getByTestId('input-email') as HTMLInputElement

      // Act
      await fireEvent.update(inputElement, 'abc')
      await waitPerfectly()
      const errorMsgInputInvalidValue = screen.getByTestId('email-error-msg')?.textContent

      await fireEvent.update(inputElement, 'abc@abc.com')
      await waitPerfectly()
      const errorMsgInputValidValue = screen.queryByTestId('email-error-msg')?.textContent

      // Assert
      expect(errorMsgInputInvalidValue).toBe('The email field must be a valid email')
      expect(errorMsgInputValidValue).toBeFalsy()
    })

    test('if all field is valid、submit button should be enabled', async () => {
      // Arrange
      render(Form)
      // You have to call flushPromises after render() called because HTMLButtonElement.disabled always return false in the initial state.
      await waitPerfectly()

      // Act
      const emailInputElement = screen.getByTestId('input-email') as HTMLInputElement
      await fireEvent.update(emailInputElement, 'abc@abc.com')
      await waitPerfectly()

      const passwordInputElement = screen.getByTestId('input-password') as HTMLInputElement
      await fireEvent.update(passwordInputElement, '123')
      await waitPerfectly()

      const submitElement = screen.getByTestId('submit-btn') as HTMLButtonElement
      await fireEvent.click(submitElement)
      await waitPerfectly()

      // Assert
      expect(submitElement.disabled).toBeFalsy()
    })

    test('if click submit button, submission function should run', async () => {
      const submitFn = vi.fn()

      // Arrange
      render(Form, { global: { mocks: { submit: submitFn } } })

      const emailInputElement = screen.getByTestId('input-email') as HTMLInputElement
      await fireEvent.update(emailInputElement, 'abc@abc.com')
      await waitPerfectly()

      const passwordInputElement = screen.getByTestId('input-password') as HTMLInputElement
      await fireEvent.update(passwordInputElement, '123')
      await waitPerfectly()

      // Act
      await fireEvent.click((screen.getByTestId('submit-btn') as HTMLButtonElement))
      await waitPerfectly()

      // Assert
      expect(submitFn).toHaveBeenCalledOnce()
      expect(mockPush).toHaveBeenCalledWith('/myPage')
    })
  })
})
