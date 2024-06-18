import { beforeEach, describe, expect, test } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../../../store/user'

const initialUser = {
  email: '',
  password: '',
}
const updatedUser = {
  email: 'new email',
  password: 'new password',
}

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('store user info should be initial state', () => {
    // Arrange
    const store = useUserStore()

    // Assert
    expect(store.user).toEqual(initialUser)
  })

  test('if you call setUserInfo(), store user info should update', () => {
    // Arrange
    const store = useUserStore()

    // Act
    store.setUserInfo(updatedUser.email, updatedUser.password)

    // Assert
    expect(store.user).toEqual(updatedUser)
  })
})
