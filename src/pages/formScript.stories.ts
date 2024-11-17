import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, waitFor, within } from '@storybook/test'
import FormScript from './formScript.vue'

type Story = StoryObj<typeof FormScript>

const meta: Meta<typeof FormScript> = {
  title: 'FormScript',
}
export default meta

export const Default: Story = {
  render: () => ({
    components: { FormScript },
    template: '<FormScript />',
  }),
}

export const EmptyForm: Story = {
  render: () => ({
    components: { FormScript },
    template: '<FormScript />',
  }),
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)
    const email = canvas.getByPlaceholderText('email')
    const password = canvas.getByPlaceholderText('password')

    // Act
    await userEvent.type(email, 'test')
    await userEvent.clear(email)
    await userEvent.type(password, 'test')
    await userEvent.clear(password)

    // Assert
    expect(await canvas.findByText('The email field is required')).toBeInTheDocument()
    expect(await canvas.findByText('The password field is required')).toBeInTheDocument()
    const isDisabled = (await canvas.findByRole('button') as HTMLButtonElement).disabled
    expect(isDisabled).toBe(true)
  },
}

export const InvalidEmailForm: Story = {
  render: () => ({
    components: { FormScript },
    template: '<FormScript />',
  }),
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)

    // Act
    await userEvent.type(canvas.getByPlaceholderText('email'), 'test')

    // Assert
    expect(await canvas.findByText('The email field must be a valid email')).toBeInTheDocument()
    const isDisabled = (await canvas.findByRole('button') as HTMLButtonElement).disabled
    expect(isDisabled).toBe(true)
  },
}

export const FullForm: Story = {
  render: () => ({
    components: { FormScript },
    template: '<FormScript />',
  }),
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)

    // Act
    await userEvent.type(canvas.getByPlaceholderText('email'), 'test@test.com')
    await userEvent.type(canvas.getByPlaceholderText('password'), 'test')

    await waitFor(async () => {
      // Assert
      const isDisabled = (await canvas.findByRole('button') as HTMLButtonElement).disabled
      expect(isDisabled).toBe(false)
    })
  },
}
