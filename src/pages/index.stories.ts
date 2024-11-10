import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse } from 'msw'
import Index from './index.vue'

type Story = StoryObj<typeof Index>

const meta: Meta<typeof Index> = {
  title: 'Index',
}

export const Default: Story = {
  render: () => ({
    components: { Index },
    template: '<Index />',
  }),
  parameters: {
    msw: {
      handlers: [
        http.get('https://httpbin.org/uuid', () => {
          return HttpResponse.json({
            uuid: 'test uuid',
          })
        }),
      ],
    },
  },
}

export default meta
