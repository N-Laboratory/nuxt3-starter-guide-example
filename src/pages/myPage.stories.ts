import type { Meta, StoryObj } from '@storybook/vue3'
import MyPage from './myPage.vue'
import { useUserStore } from '~/store/user'

type Story = StoryObj<typeof MyPage>

const meta: Meta<typeof MyPage> = {
  title: 'MyPage',
}
export default meta

export const Default: Story = {
  render: () => ({
    setup() {
      // add this
      const store = useUserStore()
      store.user.email = 'foo@bar.com'
      store.user.password = 'foobar'
    },
    components: { MyPage },
    template: '<MyPage />',
  }),
}
