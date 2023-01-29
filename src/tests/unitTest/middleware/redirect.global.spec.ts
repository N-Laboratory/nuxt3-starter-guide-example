import { afterEach, describe, expect, test, vi } from 'vitest'
import { RouteRecordNormalized, RouteLocationNormalized } from 'vue-router'
import redirect from '~/middleware/redirect.global'

vi.useFakeTimers()

const navigateToFn = vi.fn()
vi.stubGlobal('navigateTo', navigateToFn)

describe('RedirectMiddleware', () => {
  const routeRecordNormalized: RouteRecordNormalized = {
    path: '/',
    redirect: '',
    name: 'index',
    components: undefined,
    children: [],
    meta: { requiredAuth: true },
    props: { props: true },
    beforeEnter: [],
    leaveGuards: '' as any,
    updateGuards: '' as any,
    enterCallbacks: '' as any,
    instances: '' as any,
    aliasOf: undefined
  }

  afterEach(() => {
    navigateToFn.mockReset()
  })

  test('If you access [/]、 you should redirect [formScript]', async () => {
    // Arrange
    const route: RouteLocationNormalized = {
      matched: [routeRecordNormalized],
      fullPath: '',
      query: { uid: 'foo' },
      hash: '',
      redirectedFrom: undefined,
      path: '/',
      name: 'index',
      meta: { requiredAuth: true },
      params: '' as any
    }

    // Act
    await redirect(route, route)

    // Assert
    expect(navigateToFn).toHaveBeenCalledWith('formScript')
  })

  test('If you access [/myPage]、 you should redirect [formScript]', async () => {
    // Arrange
    const route: RouteLocationNormalized = {
      matched: [routeRecordNormalized],
      fullPath: '',
      query: { uid: 'foo' },
      hash: '',
      redirectedFrom: undefined,
      path: '/myPage',
      name: 'myPage',
      meta: { requiredAuth: true },
      params: '' as any
    }

    // Act
    await redirect(route, route)

    // Assert
    expect(navigateToFn).toHaveBeenCalledWith('formScript')
  })

  test('If you access [formInline]、 you should not redirect [formScript]', async () => {
    // Arrange
    const route: RouteLocationNormalized = {
      matched: [routeRecordNormalized],
      fullPath: '',
      query: { uid: 'foo' },
      hash: '',
      redirectedFrom: undefined,
      path: '/formInline',
      name: 'formInline',
      meta: { requiredAuth: true },
      params: '' as any
    }

    // Act
    await redirect(route, route)

    // Assert
    expect(navigateToFn).not.toHaveBeenCalledWith('formScript')
  })
})
