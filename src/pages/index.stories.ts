import type { Meta, StoryObj } from '@storybook/vue3'
import Index from './index.vue'

type Story = StoryObj<typeof Index>;

const meta: Meta<typeof Index> = {
  title: 'Index'
}

export const Default: Story = {
  render: () => ({
    components: { Index },
    template: '<Index />'
  })
}

export default meta