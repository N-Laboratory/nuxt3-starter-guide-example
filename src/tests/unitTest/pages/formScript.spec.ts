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
      const title = screen.getByRole('heading', { level: 1 })?.textContent?.trim()

      // Assert
      expect(title).toBe('Login')
    })

    test('submit button should be disabled', async () => {
      // Arrange
      render(Form)
      await waitPerfectly()

      // Assert
      const isDisabled = (screen.getByRole('button') as HTMLButtonElement).disabled
      expect(isDisabled).toBe(true)
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
        const inputElement = screen.getByPlaceholderText(inputName)

        // Act
        await fireEvent.update(inputElement, '')
        await waitPerfectly()

        // Assert
        expect(screen.getByText(`The ${inputName} field is required`)).toBeTruthy()
      })

    test('the email field should be a valid email', async () => {
      // Arrange
      render(Form)
      const email = screen.getByPlaceholderText('email')

      // Act
      await fireEvent.update(email, 'abc')
      await waitPerfectly()
      const errorMsgWithInvalidValue = screen.getByText('The email field must be a valid email')

      await fireEvent.update(email, 'abc@abc.com')
      await waitPerfectly()
      const errorMsgWithValidValue = screen.queryByText('The email field must be a valid email')

      // Assert
      expect(errorMsgWithInvalidValue).toBeTruthy()
      expect(errorMsgWithValidValue).toBeNull()
    })

    test('if all field is valid、submit button should be enabled', async () => {
      // Arrange
      render(Form)

      // Act
      await fireEvent.update(screen.getByPlaceholderText('email'), 'abc@abc.com')
      await waitPerfectly()

      await fireEvent.update(screen.getByPlaceholderText('password'), '123')
      await waitPerfectly()

      const submit = screen.getByRole('button') as HTMLButtonElement
      await fireEvent.click(submit)
      await waitPerfectly()

      // Assert
      expect(submit.disabled).toBe(false)
    })

    test('if click submit button, submission function should run', async () => {
      const submitFn = vi.fn()

      // Arrange
      render(Form, { global: { mocks: { submit: submitFn } } })

      await fireEvent.update(screen.getByPlaceholderText('email'), 'abc@abc.com')
      await fireEvent.update(screen.getByPlaceholderText('password'), '123')

      // Act
      await fireEvent.click(screen.getByRole('button'))
      await waitPerfectly()

      // Assert
      expect(submitFn).toHaveBeenCalledOnce()
      expect(mockPush).toHaveBeenCalledWith('/myPage')
    })
  })
})
