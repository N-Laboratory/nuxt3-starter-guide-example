<h1 align="center">Nuxt 3 Starter Guide</h1>
<p align="center">
  <img src="https://img.shields.io/badge/-Typescript-00bfff.svg?logo=typescript&style=flat">
  <img src="https://img.shields.io/badge/-Nuxt.js-008000.svg?logo=nuxt.js&style=flat">
  <img src="https://img.shields.io/badge/-Node.js-lightyellow.svg?logo=node.js&style=flat">
  <img src="https://img.shields.io/badge/-ESLint-4B32C3.svg?logo=eslint&style=flat">
  <img src="https://img.shields.io/badge/-Vitest-FF8800.svg?logo=vitest&style=flat">
  <img src="https://img.shields.io/badge/-Puppeteer-lightyellow.svg?logo=puppeteer&style=flat">
  <img src="https://img.shields.io/badge/-SonarQube-white.svg?logo=sonarqube&style=flat">
  <img src="https://img.shields.io/badge/-Windows-0078D6.svg?logo=windows&style=flat">
  <img src="https://img.shields.io/badge/-Mac-grey.svg?logo=macos&style=flat">
  <img src="https://img.shields.io/badge/-Linux-black.svg?logo=linux&style=flat">
  <img src="https://img.shields.io/badge/-VSCode-007ACC.svg?logo=visualstudiocode&style=flat">
  <a href="https://twitter.com/NL4boratory" target="_blank">
    <img alt="Twitter: N-LAB" src="https://img.shields.io/twitter/follow/NL4boratory.svg?style=social" />
  </a>
  <a href="https://github.com/N-Laboratory" target="_blank">
    <img src="https://img.shields.io/badge/-FollowMyAccount-grey.svg?logo=github&style=flat">
  </a>
</p>
<a href="https://github.com/N-Laboratory/nuxt3-starter-guide-example-jpn" target="_blank">
  日本語版はこちら
</a>

This project is a template nuxt 3 project compatible with nuxt 3.12.
If your nuxt versions less than 3.12, please check here: https://github.com/N-Laboratory/nuxt3-starter-guide-example/releases/tag/v1.0

The minimum required functions are implemented as a template project and the essentials are explained.
This project also implement unit testing, E2E testing, and analyzing source code by SonarQube.

This project implement the following.
* Vitest (unit test)
* EsLint (Flat Config and Stylistic)
* Migrate to Flat Config and Stylistic
* VeeValidate
* Navigation guard
* Pinia
* Puppeteer (E2E test)
* SonarQube
* TypeScript

## Contents

1. [Create New Project](#create-new-project)
1. [Typescript Setup](#typescript-setup)
1. [EsLint Flat Config Setup](#eslint-flat-config-setup)
1. [EsLint Stylistic Setup](#eslint-stylistic-setup)
1. [Migrate To Flat Config And Stylistic](#migrate-to-flat-config-and-stylistic)
1. [Vitest Setup](#vitest-setup)
1. [VeeValidate Setup](#veevalidate-setup)
1. [VeeValidate Testing](#veevalidate-testing)
1. [Navigation guard](#navigation-guard)
1. [Pinia Setup](#pinia-setup)
1. [Pinia Testing](#pinia-testing)
1. [Data Fetching](#data-fetching)
1. [E2E Testing By Puppeteer](#e2e-testing-by-puppeteer)
1. [Analyzing source code by SonarQube](#analyzing-source-code-by-sonarqube)

## Create [New Project](https://nuxt.com/docs/getting-started/installation#new-project)
Run below command to create a new nuxt 3 project.
```bash
npx nuxi@latest init <project-name>
```

If you want to change source directory, add the following to nuxt.config.ts.
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: 'src/'
});
```

### Install
```bash
npm install
```
### Usage
```bash
npm run dev
```
You can access http://localhost:3000 to use this application.

## [Typescript](https://nuxt.com/docs/guide/concepts/typescript) Setup
You may experience issues with the latest vue-tsc and vite-plugin-checker, used internally when type checking. For now, you may need to stay on v1 of vue-tsc.
For more details, please see https://nuxt.com/docs/guide/concepts/typescript#type-checking
```bash
npm install --save-dev vue-tsc@^1 typescript
```

Add typescript to nuxt.config.ts.
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // For more about all the available options, please see https://nuxt.com/docs/api/nuxt-config#typescript
  typescript: {
    // Enable type-checking at build time
    typeCheck: true
  },
});
```

If you had installed vue-tsc v2, an error will occur like below.
https://github.com/vuejs/language-tools/issues/3969

The only solution currently is to downgrade vue-tsc v1 or try following.
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    // Change typeCheck to false to avoid above error.
    typeCheck: false
  },
});
```

## EsLint [Flat Config](https://eslint.nuxt.com/packages/module) Setup
The flat config format is the future of ESLint and is designed to be more flexible and project-aware.

```bash
npm install --save-dev @nuxt/eslint eslint
```

Add @nuxt/eslint to modules in nuxt.config.ts.
```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
})
```

Create eslint.config.mjs in root directory and add the following.
For more about all the available options, please see https://eslint.org/docs/latest/use/configure/configuration-files
```js
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // An array of glob patterns indicating the files that the configuration object should apply to.
    files: ['**/*.ts', '**/*.tsx'],
    // An array of glob patterns indicating the files that the configuration object should not apply to.
    // Use ignores instead of --ignore-path.
    ignores: ["**/*.config.ts"],
    // An object containing the configured rules. When files or ignores are specified, these rule configurations are only available to the matching files.
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['**/*.vue',],
    rules: {
      'no-console': 'error'
    }
  }
)
```

Ignores has the following defined by default.

https://github.com/nuxt/eslint/blob/main/packages/eslint-config/src/flat/configs/ignores.ts
```ts
import type { Linter } from 'eslint'

export default function ignores(): Linter.FlatConfig[] {
  return [
    {
      ignores: [
        '**/dist',
        '**/node_modules',
        '**/.nuxt',
        '**/.output',
        '**/.vercel',
        '**/.netlify',
      ],
    },
  ]
}
```

Add the following item to scripts in package.json.
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
  }
}
```

Use below command to run ESLint.
```bash
# run ESLint
npm run lint

# run ESLint + fix code
npm run lint:fix
```

### VS Code setup
ESLint v9.x support was added in the ESLint VS Code extension (vscode-eslint) v3.0.10.

In versions of vscode-eslint prior to v3.0.10, the new configuration system is not enabled by default. To enable support for the new configuration files, edit your .vscode/settings.json file and add the following:
```json
{
  "eslint.experimental.useFlatConfig": true
}
```

## ESLint [Stylistic](https://eslint.nuxt.com/packages/module#eslint-stylistic) Setup
```bash
npm install --save-dev @nuxt/eslint eslint
```
Nuxt integrate with ESLint Stylistic directly.

Similar to the ESLint Module, you can opt-in by setting stylistic to true in the features module options.
```ts
export default defineNuxtConfig({
  modules: [
    // Add '@nuxt/eslint'
    '@nuxt/eslint'
  ],
  eslint: {
    config: {
      stylistic: true
    }
  }
})
```
You can also customize the rules.

For more about all the available options, please see https://eslint.style/guide/config-presets#configuration-factory
```ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    }
  }
})
```

### Automatically format code on save with ESLint in VSCode
Add the following to .vscode/setting.json
```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
}
```

## Migrate To Flat Config And Stylistic
This guide provides an overview of how you can migrate your ESLint configuration file from eslintrc and prettier to ESLint flat config and ESLint stylistic.
For more details, please see https://eslint.org/docs/latest/use/configure/migration-guide


First, install Nuxt ESLint.
```bash
npm install --save-dev @nuxt/eslint eslint
```

### Migrate from eslintrc to ESLint flat config
Delete @nuxtjs/eslint-config-typescript.
```bash
npm uninstall @nuxtjs/eslint-config-typescript
```
Delete @nuxtjs/eslint-config-typescript in package.json.
```diff
"devDependencies": {
- "@nuxtjs/eslint-config-typescript": "^12.1.0",
},
```

Delete .eslintrc file.
```diff
- {
-   "extends": [
-     "@nuxtjs/eslint-config-typescript"
-   ],
-   "rules": {
-     "no-console": "off"
-   }
- }
```

Create eslint.config.mjs file in you root directory.
```js
// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    // Use ignores instead of --ignore-path.
    ignores: ['**/*.log*', '.cache/**'],
    rules: {
      'no-console': 'off',
    },
  },
)
```

Modify npm scripts like below.
```diff
"scripts": {
- lint: "eslint --ext \".js,.ts,.vue\" --ignore-path .gitignore .",
+ lint: "eslint .",
},
```

### Migrate from prettier to ESLint stylistic
Delete prettier and eslint-config-prettier, eslint-plugin-prettier.
```bash
npm uninstall prettier eslint-config-prettier eslint-plugin-prettier
```
Delete prettier and eslint-config-prettier, eslint-plugin-prettier in package.json.
```diff
"devDependencies": {
- "eslint-plugin-prettier": "^5.1.0",
- "eslint-config-prettier": "^8.3.0",
- "prettier": "^2.5.1",
},
```

Delete .prettierrc file.
```diff
- {
-   "indent": 2,
-   "quotes": 'single',
-   "semi": false
- }
```

Add rules to nuxt.config.ts
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    }
  }
})
```
Delete prettier commands from npm scripts in package.json.


## [Vitest](https://vitest.dev/) Setup

```bash
# install Vitest
npm install --save-dev vitest @testing-library/vue happy-dom
```

Create vitest.config.ts in root directory and add the following to vitest.config.ts.
```ts
// vitest.config.ts
import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  }
})
```

Add the following to package.json.
```json
{
  "config": {
    "path": "./src/tests/unitTest/pages/index.spec.ts"
  },
  "scripts": {
    "test:all": "vitest",
    "test:linux": "vitest $npm_package_config_path",
    "test:win": "vitest %npm_package_config_path%"
  },
}
```

### Auto import configure

Use below plugin because vitest does not import function that auto import by Nuxt.
```bash
# https://github.com/antfu/unplugin-auto-import
npm install --save-dev unplugin-auto-import
```
Add plugins to vitest.config.ts
```ts
// vitest.config.ts
export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      // Set plugin name you want to import. You can set preset name.
      // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
      imports: ['vue', 'pinia', 'vue-router']
    })
  ],
})
```
You can set custom plugin like this.
```ts
// vitest.config.ts
AutoImport({
  imports: [
    {
      "nuxt/app": [
        "foo"
      ]
    }
  ]
})
```

### Collect coverage
```bash
npm install --save-dev @vitest/coverage-v8 vitest-sonar-reporter
```

Add the following to vitest.config.ts.
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{vue,js,ts}'],
      all: true,
      reporter: ['html', 'clover', 'text']
    },
    root: '.',
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml'
  }
});
```
Add --coverage to the following item in package.json.
```json
{
  "scripts": {
    "test:all": "vitest --coverage",
    "test:linux": "vitest --coverage $npm_package_config_path",
    "test:win": "vitest --coverage %npm_package_config_path%"
  },
}
```

Add index.vue to pages directory.
```vue
// index.vue
<template>
  <h1>
    Pages/index.vue
  </h1>
</template>
```

Here is a test code of index.vue.
```ts
import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import Index from './pages/index.vue'

describe('Index', () => {
  test('Index page should render page title', () => {
    // Arrange
    render(Index)
    const title = screen.getByText('Pages/index.vue')

    // Assert
    expect(title).toBeDefined()
  })
})
```

Run below command to run test.
```bash
# run all tests
npm run test:all
```

You can also run each test file.
Set test file path to config:path in package.json.
```json
{
  "config": {
    "path": "./src/tests/unitTest/pages/index.spec.ts"
  },
}
```
```bash
# Run test file defined config:path in package.json (Mac/Linux)
npm run test:linux

# Run test file defined config:path in package.json (Windows)
npm run test:win
```

## [VeeValidate](https://vee-validate.logaretm.com/v4/) Setup
```bash
# install VeeValidate
npm install --save-dev vee-validate @vee-validate/i18n @vee-validate/rules
```
Create vee-validate-plugin.ts in plugins directory and add the following to vee-validate-plugin.ts.
```ts
// vee-validate-plugin.ts
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  configure({
    generateMessage: localize({
      en,
    }),
  })

  // import vee-validate all rules
  Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule)
  })
})
```

### Form validation
In vee-validate4, there are two ways to implement validation.
* implement validation in script setup
* implement validation in html

#### Implement validation in script setup
If you implement validation in script setup, use useForm/useField.
```ts
<script lang="ts" setup>
import { useForm, useField } from 'vee-validate'

// Form configuration. See the following for more details.
// https://vee-validate.logaretm.com/v4/api/use-form/#api-reference
const { handleSubmit, errors, isSubmitting, meta } = useForm({
  // Set validation rule
  validationSchema: {
    email: 'required|email'
  }
})

// Field configuration
const { value: email } = useField('email')

// If you click submit button, this function called.
const foo = () => {
  console.log(email.value)
}

// If you click submit button, this function called and also run validation check at the same time.
const foo = handleSubmit(() => {
  console.log(email.value)
})
</script>

<template>
  <input v-model="email" type="text" name="email">

  <!-- Show error message -->
  <span v-if="errors.email">{{ errors.email }}</span>

  <!-- When all field value is valid, meta.valid return true. -->
  <button type="button" :disabled="!meta.valid" @click="foo">Submit</button>

  <!-- If the form submission function is being run, isSubmitting return true. -->
  <button type="button" :disabled="isSubmitting" @click="foo">Submit</button>
</template>
```

#### Implement validation in html
If you implement validation in html, use Form/Field components.
```ts
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

// If you click submit button, this function called.
const foo = (values: Record<string, any>) => {
  console.log(values.email)
}
</script>

<template>
  <!-- Form configuration. See the following for more details -->
  <!-- https://vee-validate.logaretm.com/v4/api/use-form/#api-reference -->
  <Form v-slot="{ meta, isSubmitting }" data-testid="validation-form" @submit="foo">
    <Field rules="required|email" name="email" as="input" type="text" />

    <!-- Show error message -->
    <ErrorMessage name="email" />

    <!-- When all field value is valid, meta.valid return true. -->
    <button :disabled="!meta.valid">Submit</button>

    <!-- If the form submission function is being run, isSubmitting return true. -->
    <button :disabled="isSubmitting">Submit</button>
  </Form>
</template>
```

## VeeValidate [Testing](https://vee-validate.logaretm.com/v4/guide/testing) 
```bash
# flush-promises install
npm install --save-dev flush-promises
```

To import vee-validate configuration, add setupFiles to vitest.config.ts.
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    // Import below file when run test.
    setupFiles: './src/tests/unitTest/setup.ts'
  }
})
```

Create setup.ts in src/tests/unitTest and add the following to setup.ts.
```ts
// setup.ts
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { vi } from 'vitest'
import flushPromises from 'flush-promises'

// vee-validate setup
configure({
  generateMessage: localize({
    en,
  }),
})

// import vee-validate all rules
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})

// Call this method after you called fireEvent.
// After call this method, your fireEvent operation will apply to HTML.
export const waitPerfectly = async () => {
  await flushPromises()
  vi.runAllTimers()
  await flushPromises()
}
```

Here is a sample test code of form validation.
It tests email format.

See the following for more details.
* https://vee-validate.logaretm.com/v4/guide/testing
* https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/validate-plugin.js

```ts
// form.vue
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

const foo = (values: Record<string, any>) => {
  console.log(values.email)
}
</script>

<template>
  <Form v-slot="{ meta, isSubmitting }" data-testid="validation-form" @submit="foo">
    <Field rules="required|email" name="email" as="input" type="text" data-testid="input-email" />
    <ErrorMessage name="email"  data-testid="email-error-msg" />
    <button :disabled="!meta.valid">Submit</button>
  </Form>
</template>
```

```ts
// form.spec.ts
import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { waitPerfectly } from '/setup'
import Form from './pages/index.vue'

vi.useFakeTimers()

test('the email field should be a valid email', async () => {
  // Arrange
  render(Form)
  const inputElement = screen.getByTestId('input-email') as HTMLInputElement

  // Act
  // Input a invalid value
  await fireEvent.update(inputElement, 'abc')
  await fireEvent.blur(inputElement)
  // Apply html
  await waitPerfectly()
  // Get error message
  const errorMsg = screen.getByTestId('email-error-msg')?.textContent

  // Assert
  expect(errorMsg).toBe('The email field must be a valid email')
})
```

## [Navigation guard](https://nuxt.com/docs/guide/directory-structure/middleware)
You can implement redirect function in middleware directory.

The file have different functions by setting the the following file name.
* redirect.ts (anonymous (or inline) route middleware, which are defined directly in the pages where they are used.)
```ts
// foo.vue
<script setup>
definePageMeta({
  middleware: ["redirect"]
})
</script>
```
* redirect.global.ts (automatically run on every route change)

Here is a sample code. See [this](https://nuxt.com/docs/guide/directory-structure/middleware) for more details.


```ts
// redirect.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // If you access /
  if (to.path === '/') {
    // Redirect to login
    return navigateTo('login')
  }
})
```

See [this](https://github.com/N-Laboratory/nuxt3-starter-guide/commit/967fb06c6a850534090de72ecc1da134c60251e8) for test implementation .

## [Pinia](https://pinia.vuejs.org/ssr/nuxt.html) Setup
```bash
# install Pinia
npm install pinia @pinia/nuxt
```

If you're using npm, you might encounter an ERESOLVE unable to resolve dependency tree error. In that case, add the the following to your package.json:
```json
{
  "overrides": {
    "vue": "latest"
  }
}
```

If you see below error message, fix override:vue like below.
```bash
npm ERR! Invalid comparator: latest
```

```json
{
  "overrides": {
    "vue": "3.4.30"
  }
}
```

Add the following to nuxt.config.ts
```ts
// nuxt.config.ts
export default defineNuxtConfig({
    modules: [
        ['@pinia/nuxt',
            {
                autoImports: [
                  // Import defineStore
                  'defineStore'
                ]
                // If you use vuex at the same time, add the following
                // disableVuex: false
            }
        ]
    ]
});
```
### Store implementation
Create user.ts in store directory and add the following to user.ts.
```ts
// user.ts
// If you add defineStore to autoImports in nuxt.config.ts, you don't need to import below
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // User definition and initialization
    user: { email: '', password: '' }
  }),
  actions: {
    // Update use info
    setUserInfo (email: string, password: string) {
      this.user.email = email
      this.user.password = password
    }
  }
})
```

Here is a sample code using store from vue file.
```ts
// store.vue
<script lang="ts" setup>
import { useUserStore } from '../store/user'

// Use store
const store = useUserStore()

// Get email from store user info
const email = store.user.email

// Get password from store user info
const password = store.user.password

// Update store user info
store.setUserInfo("new email", "new password")
</script>
```

## Pinia [Testing](https://pinia.vuejs.org/cookbook/testing.html)
```bash
# install @pinia/testing
npm install --save-dev @pinia/testing
```

When run test file using pinia, the following error occurs.
```bash
getActivePinia was called with no active Pinia. Did you forget to install pinia?
```
To avoid this error, call setActivePinia function in beforeEach.
```ts
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
```

You can set the initial state of all of your stores when creating a testing pinia by passing an initialState.
See [this](https://pinia.vuejs.org/cookbook/testing.html#initial-state) for more details.
```vue
<script lang="ts" setup>
import { useUserStore } from '../store/user'

const store = useUserStore()
const email = store.user.email
const password = store.user.password
</script>

<template>
  <div>
    <p>Email: {{ email }}</p>
    <p>Password: {{ password }}</p>
  </div>
</template>
```
```ts
import { beforeEach, expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import Foo from './pages/index.vue'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('store user info should set the initial value', () => {
  // Arrange
  render(Foo, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            user: { user: { email: 'test@test.com', password: 'test' } },
          },
        }),
      ],
    },
  })

  // Assert
  expect(screen.getByText('Email: test@test.com')).toBeDefined()
  expect(screen.getByText('Password: test')).toBeDefined()
})
```
## [Data Fetching](https://nuxt.com/docs/getting-started/data-fetching)
Nuxt provides useFetch instead of axios. It handles data fetching within your application.
See [this](https://nuxt.com/docs/getting-started/data-fetching) for more details.
```ts
// api.vue
<script lang="ts" setup>
const { data: bar } = await useFetch('/api/v1/foo')
</script>

<template>
  Result: {{ bar }}
</template>
```

## E2E Testing By [Puppeteer](https://github.com/puppeteer/puppeteer)
Most things that you can do manually in the browser can be done using Puppeteer as E2E testing.
```bash
# install Puppeteer
npm install --save-dev puppeteer
```
```vue
<script lang="ts" setup>
import { Form, Field } from 'vee-validate'
</script>

<template>
  <Form v-slot="{ meta, isSubmitting }">
    <Field
      rules="required|email"
      name="email"
      as="input"
      type="text"
    />
    <Field
      rules="required"
      name="password"
      as="input"
      type="text"
    />
    <button
      :disabled="isSubmitting || !meta.valid"
      data-testid="submit-btn"
    >
      Submit
    </button>
  </Form>
</template>
```
Here is a sample E2E testing code.
It tests submit button state.
```ts
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch, PuppeteerLaunchOptions } from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

// Set browser launch option. See the following for more details.
// https://pptr.dev/api/puppeteer.browserlaunchargumentoptions
const options: PuppeteerLaunchOptions = {
  headless: false,
  slowMo: 75,
  defaultViewport: {
    width: 1280,
    height: 1024
  },
  devtools: true,
  args: ['--window-size=1680,1024']
}

describe('E2E', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await launch(options)
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

   test('1-If you input a valid value, submit button should enable', async () => {
      try {
        // Arrange
        await page.goto('http://localhost:3000/foo')

        // Act
        // Input email
        await page.type('input[name="email"]', 'foo@bar.com')

        // Input password
        await page.type('input[name="password"]', 'foo')

        // Get submit button state. inactive → true, active → false
        const isDisabled = await page.$eval(
          '[data-testid="submit-btn"]',
          element => (element as HTMLButtonElement).disabled
        )

        // Take a screenshot
        await page.screenshot({
          path: './src/tests/e2eTest/evidence/pages/foo/test-01.png',
          fullPage: true
        })

        // Assert
        expect(isDisabled).toBe(false)
      } catch (e) {
        console.error(e)
        expect(e).toBeUndefined()
      }
    }, 60000)
})
```
To run E2E testing, add the test file path to config:path in package.json.
```json
{
  "config": {
    "path": "./src/tests/e2eTest/spec/foo.spec.ts"
  },
}
```
```bash
# run application server
npm run dev

# run E2E testing
npm run test:e2e
```

## Analyzing source code by [SonarQube](https://docs.sonarqube.org/latest/)
SonarQube is a self-managed, automatic code review tool that systematically helps you deliver clean code.
```bash
# install SonarQube tools
npm install --save-dev sonarqube-scanner vitest-sonar-reporter
```

Add the following to vitest.config.ts.
* add lcov to reporter
* add reporters and outputFile to test
```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      // To collect coverage by SonarQube, add lcov.
      reporter: ['html', 'clover', 'text', 'lcov']
    },
    // To analyze your test code by SonarQube, output test report file
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
  }
})
```

Create sonar-project.properties in root directory and add the following to sonar-project.properties. See [this](https://docs.sonarqube.org/9.6/project-administration/narrowing-the-focus/) for more details.
```properties
sonar.projectKey=nuxt3-starter-guide
sonar.projectName=nuxt3-starter-guide
sonar.sources=src
sonar.tests=src/tests/
sonar.test.inclusions=src/tests/**/*.spec.ts
sonar.exclusions=**/*plugins*/**, src/tests/**/*.spec.ts, src/tests/**/setup.ts
sonar.testExecutionReportPaths=test-report.xml
sonar.javascript.file.suffixes=.js,.jsx
sonar.typescript.file.suffixes=.ts,.tsx,.vue
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.login=sqp_XXXXXXXXXXXXXXXXXXXXXX
```

### Create a SonarQube project
Make sure you have installed SonarQube on your development machine.
Run SonarQube server as localhost:9000 before do the following.

To create a SonarQube project, do the following.
1. Access the following url.
http://localhost:9000/projects

1. Click [Create Project] and then click [Manually]

1. Input __nuxt3-starter-guide__ in Project display name and Project key. Click [Set Up]

1. Click [Locally]

1. Click [Generate] and then generate project token

### Analyze your source code
Add project token to sonar.login in sonar-project.properties.
See [this](https://docs.sonarqube.org/latest/user-guide/user-account/generating-and-using-tokens/) for more details of token.
```properties
sonar.login=sqp_XXXXXXXXXXXXXXXXXXXXXX
```

Add the following to scripts in package.json.
```json
{
  "scripts": {
    "sonar": "sonar-scanner"
  },
}
```

Run below command to run SonarQube analysis.
```bash
# run all tests
npm run test:all

# run SonarQube analysis
npm run sonar
```

You can access the following url to show result.

http://localhost:9000/dashboard?id=nuxt3-starter-guide