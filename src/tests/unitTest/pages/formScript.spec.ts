import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { waitPerfectly } from '../setup'
import Form from '~/pages/formScript.vue'

vi.useFakeTimers()

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
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
      const { container } = render(Form)

      // You need to call trim() because textContent return text with spaces added back and forth.
      const title = container.querySelector('[data-testid="page-title"]')?.textContent?.trim()

      // Assert
      expect(title).toBe('Login')
    })

    test('submit button should be disabled', async () => {
      // Arrange
      const { container } = render(Form)

      // You have to call flushPromises after render() called because HTMLButtonElement.disabled always return false in the initial state.
      await waitPerfectly()
      const isDisabled = (container.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement).disabled

      // Assert
      expect(isDisabled).toBeTruthy()
    })
  })

  describe('vee-validate testing', () => {
    test.each([
      ['email'],
      ['password']
    ])(
      'the %s field is required',
      async (
        inputName
      ) => {
        // Arrange
        const { container } = render(Form)
        const inputElement = container.querySelector(`[data-testid="input-${inputName}"]`) as HTMLInputElement

        // Act
        await fireEvent.update(inputElement, '')
        await waitPerfectly()
        const errorMsg = container.querySelector(`[data-testid="${inputName}-error-msg"]`)?.textContent

        // Assert
        expect(errorMsg).toBe(`The ${inputName} field is required`)
      })

    test('the email field should be a valid email', async () => {
      // Arrange
      const { container } = render(Form)
      const inputElement = container.querySelector('[data-testid="input-email"]') as HTMLInputElement

      // Act
      await fireEvent.update(inputElement, 'abc')
      await waitPerfectly()
      const errorMsgInputInvalidValue = container.querySelector('[data-testid="email-error-msg"]')?.textContent

      await fireEvent.update(inputElement, 'abc@abc.com')
      await waitPerfectly()
      const errorMsgInputValidValue = container.querySelector('[data-testid="email-error-msg"]')?.textContent

      // Assert
      expect(errorMsgInputInvalidValue).toBe('The email field must be a valid email')
      expect(errorMsgInputValidValue).toBeFalsy()
    })

    test('if all field is valid、submit button should be enabled', async () => {
      // Arrange
      const { container } = render(Form)
      // You have to call flushPromises after render() called because HTMLButtonElement.disabled always return false in the initial state.
      await waitPerfectly()

      // Act
      const emailInputElement = container.querySelector('[data-testid="input-email"]') as HTMLInputElement
      await fireEvent.update(emailInputElement, 'abc@abc.com')
      await waitPerfectly()

      const passwordInputElement = container.querySelector('[data-testid="input-password"]') as HTMLInputElement
      await fireEvent.update(passwordInputElement, '123')
      await waitPerfectly()

      const submitElement = container.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement
      await fireEvent.click(submitElement)
      await waitPerfectly()

      // Assert
      expect(submitElement.disabled).toBeFalsy()
    })

    test('if click submit button, submission function should run', async () => {
      const submitFn = vi.fn()

      // Arrange
      const { container } = render(Form, { global: { mocks: { submit: submitFn } } })

      const emailInputElement = container.querySelector('[data-testid="input-email"]') as HTMLInputElement
      await fireEvent.update(emailInputElement, 'abc@abc.com')
      await waitPerfectly()

      const passwordInputElement = container.querySelector('[data-testid="input-password"]') as HTMLInputElement
      await fireEvent.update(passwordInputElement, '123')
      await waitPerfectly()

      // Act
      await fireEvent.click((container.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement))
      await waitPerfectly()

      // Assert
      expect(submitFn).toHaveBeenCalledOnce()
      expect(mockPush).toHaveBeenCalledWith('/myPage')
    })
  })
})
