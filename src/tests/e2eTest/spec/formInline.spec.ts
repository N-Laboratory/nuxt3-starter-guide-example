import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch } from 'puppeteer'
import type { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer'

const options: PuppeteerLaunchOptions = {
  headless: false,
  slowMo: 75,
  defaultViewport: {
    width: 1280,
    height: 1024,
  },
  devtools: true,
  args: ['--window-size=1680,1024'],
}

describe('Index', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await launch(options)
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  describe('initial check', () => {
    test('1-submit button should be disabled', async () => {
      try {
        // Act
        await page.goto('http://localhost:3000/formInline')
        const isDisabled = await page.$eval(
          '[data-testid="submit-btn"]',
          element => (element as HTMLButtonElement).disabled,
        )

        // take a photo for evidence
        await page.screenshot({
          path: './src/tests/e2eTest/evidence/pages/formInline/test-01.png',
          fullPage: true,
        })

        // Assert
        expect(isDisabled).toBeTruthy()
      }
      catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)
  })

  describe('form validation check', () => {
    test.each([
      [
        '2',
        'email',
      ],
      [
        '3',
        'password',
      ],
    ])(
      '%s:the %s field is required',
      async (
        testNo,
        inputName,
      ) => {
        try {
          // Act
          await page.goto('http://localhost:3000/formInline')
          await page.type(`input[name="${inputName}"]`, '')
          await page.keyboard.press('Tab')

          // take a photo for evidence
          await page.screenshot({
            path: `./src/tests/e2eTest/evidence/pages/formInline/test-0${testNo}.png`,
            fullPage: true,
          })

          const errorMsg = await page.$eval(
            `[data-testid="${inputName}-error-msg"]`,
            element => element.textContent,
          )

          // Assert
          expect(errorMsg).toBe(`The ${inputName} field is required`)
        }
        catch (e) {
          console.error(e)
          expect(e).toBeUndefined()
        }
      },
      60000,
    )

    test('4-the email field should be a valid email', async () => {
      try {
        // Act
        await page.goto('http://localhost:3000/formInline')
        await page.type('input[name="email"]', 'test')
        await page.keyboard.press('Tab')

        // take a photo for evidence
        await page.screenshot({
          path: './src/tests/e2eTest/evidence/pages/formInline/test-04.png',
          fullPage: true,
        })

        const errorMsg = await page.$eval(
          '[data-testid="email-error-msg"]',
          element => element.textContent,
        )

        // Assert
        expect(errorMsg).toBe('The email field must be a valid email')
      }
      catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)

    test('5-if click submit button, page should go to myPage', async () => {
      try {
        // Arrange
        await page.goto('http://localhost:3000/formInline')
        await page.type('input[name="email"]', 'test@test.com')
        await page.type('input[name="password"]', 'test')
        await page.keyboard.press('Tab')
        const isDisabled = await page.$eval(
          '[data-testid="submit-btn"]',
          element => (element as HTMLButtonElement).disabled,
        )

        // Act
        await page.click('[data-testid="submit-btn"]')

        // take a photo for evidence
        await page.screenshot({
          path: './src/tests/e2eTest/evidence/pages/formInline/test-05.png',
          fullPage: true,
        })

        // you need to call trim() because textContent return text with spaces added back and forth.
        const pageTitle = await page.$eval(
          '[data-testid="page-title"]',
          element => element.textContent?.trim(),
        )
        const email = await page.$eval(
          '[data-testid="page-email"]',
          element => element.textContent,
        )
        const password = await page.$eval(
          '[data-testid="page-password"]',
          element => element.textContent,
        )

        // Assert
        expect(isDisabled).toBeFalsy()
        expect(pageTitle).toBe('MyPage')
        expect(email).toBe('test@test.com')
        expect(password).toBe('test')
      }
      catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)
  })
})
