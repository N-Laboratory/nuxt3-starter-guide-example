<h1 align="center">Nuxt 3 Starter Guide</h1>
<p align="center">
  <img src="https://img.shields.io/badge/-Typescript-00bfff.svg?logo=typescript&style=flat">
  <img src="https://img.shields.io/badge/-Nuxt.js-008000.svg?logo=nuxt.js&style=flat">
  <img src="https://img.shields.io/badge/-Node.js-lightyellow.svg?logo=node.js&style=flat">
  <img src="https://img.shields.io/badge/-ESLint-4B32C3.svg?logo=eslint&style=flat">
  <img src="https://img.shields.io/badge/-Vitest-FF8800.svg?logo=vitest&style=flat">
  <img src="https://img.shields.io/badge/-Storybook-grey.svg?logo=storybook&style=flat">
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


This project is a template nuxt 3 project.

The minimum required functions are implemented as a template project and the essentials are explained.
This project also implement unit testing, E2E testing, and analyzing source code by SonarQube.

This project implement the following.
* TypeScript
* EsLint (Flat Config and Stylistic)
* Migrate to Flat Config and Stylistic
* VeeValidate
* Navigation guard
* Pinia
* Storybook
* Vitest (unit test)
* Puppeteer (E2E test)
* SonarQube

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
1. [Storybook Setup](#storybook-setup)
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
```bash
npm install --save-dev vue-tsc typescript
```

Add typescript property to nuxt.config.ts.
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
If the lint rule does not apply, restart nuxt server and VSCode.
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
    '@nuxt/eslint'
  ],
  // Add this
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
If the stylistic rules does not apply, restart nuxt server and VSCode.

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
    // An array of glob patterns indicating the files that the configuration object should apply to.
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    // An array of glob patterns indicating the files that the configuration object should not apply to.
    // Use ignores instead of --ignore-path.
    ignores: ['**/*.log*', '.cache/**'],
    // An object containing the configured rules. When files or ignores are specified, these rule configurations are only available to the matching files.
    rules: {
      'no-console': 'off'
    }
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
npm install --save-dev vitest @testing-library/user-event @testing-library/vue happy-dom
```

Create vitest.config.ts in root directory and add the following to vitest.config.ts.
```ts
// vitest.config.ts
import path from 'path'
import { defineConfig } from 'vitest/config'

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

Use below plugin because vitest does not import function/components that auto import by Nuxt.
```bash
npm install --save-dev unplugin-auto-import unplugin-vue-components
```
Add plugins to vitest.config.ts
```ts
// vitest.config.ts
import Vue from '@vitejs/plugin-vue'
import AutoImportFunctions from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'

export default defineConfig({
  // Add this
  plugins: [
    Vue(),
    // Set plugin name you want to import. You can set preset name.
    // https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
    AutoImportFunctions ({ imports: [
      'vue',
      'vee-validate',
      'vue-router',
      'pinia',
    ], dts: 'auto-imports.d.ts' }),
    AutoImportComponents({
      // It is assumed that the source directory is changed to src directory.
      dirs: ['src/components'],
      dts: '.nuxt/components.d.ts',
    }),
  ],
})
```
You can set custom plugin like this.
```ts
// vitest.config.ts
AutoImportFunctions({
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
```ts
// src/pages/index.vue
<template>
  <h1>
    Pages/index.vue
  </h1>
</template>
```

Here is a test code of index.vue.
```ts
// src/tests/unitTest/pages/index.spec.ts
import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import Index from '~/pages/index.vue'

describe('Index', () => {
  test('should render page title', () => {
    // Arrange
    render(Index)
    const title = screen.getByText('Pages/index.vue')

    // Assert
    expect(title).toBeTruthy()
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
// src/plugins/vee-validate-plugin.ts
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
const { value: email } = useField<string>('email')

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
const foo = (values: Record<string, string>) => {
  console.log(values.email)
}
</script>

<template>
  <!-- Form configuration. See the following for more details -->
  <!-- https://vee-validate.logaretm.com/v4/api/use-form/#api-reference -->
  <Form v-slot="{ meta, isSubmitting }" @submit="foo">
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
// src/tests/unitTest/setup.ts
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'

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
```

Here is a sample test code of form validation.
It tests email format.

See the following for more details.
* https://vee-validate.logaretm.com/v4/guide/testing
* https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/validate-plugin.js

```ts
// src/pages/form.vue
<script lang="ts" setup>
import { Form, Field, ErrorMessage } from 'vee-validate'

const foo = (values: Record<string, string>) => {
  console.log(values.email)
}
</script>

<template>
  <Form v-slot="{ meta }" @submit="foo">
    <Field rules="required|email" name="email" as="input" type="text" placeholder="email" />
    <ErrorMessage name="email" />
    <button :disabled="!meta.valid">Submit</button>
  </Form>
</template>
```

```ts
// src/tests/unitTest/pages/form.spec.ts
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Form from '~/pages/form.vue'

test('should error message display', async () => {
  // Arrange
  const user = userEvent.setup()
  render(Form)

  // Act
  await user.type(screen.getByPlaceholderText('email'), 'abc{Tab}')

  // Assert
  expect(screen.getByText('The email field must be a valid email')).toBeTruthy()
})
```

## [Navigation guard](https://nuxt.com/docs/guide/directory-structure/middleware)
You can implement redirect function in middleware directory.

The file have different functions by setting the the following file name.
* src/middleware/redirect.ts (anonymous (or inline) route middleware, which are defined directly in the pages where they are used.)
```ts
// foo.vue
<script setup>
definePageMeta({
  middleware: ["redirect"]
})
</script>
```
* src/middleware/redirect.global.ts (automatically run on every route change)

Here is a sample code. See [this](https://nuxt.com/docs/guide/directory-structure/middleware) for more details.


```ts
// src/middleware/redirect.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // If you access /foo
  if (to.path === '/foo') {
    // Redirect to login
    return navigateTo('login')
  }
})
```

See [this](https://github.com/N-Laboratory/nuxt3-starter-guide-example/blob/main/src/tests/unitTest/middleware/redirect.global.spec.ts) for test implementation .

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

If you see below error message, modify overrides:vue like below.
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
// src/store/user.ts
// If you add defineStore to autoImports in nuxt.config.ts, you don't need to import below
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // User definition and initialization
    user: { email: '', password: '' }
  }),
  actions: {
    // Update user info
    setUserInfo (email: string, password: string) {
      this.user.email = email
      this.user.password = password
    }
  }
})
```

Here is a sample code using store from vue file.
```ts
// src/pages/store.vue
<script lang="ts" setup>
import { useUserStore } from '~/store/user'

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
import { useUserStore } from '~/store/user'

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
```ts
// src/pages/index.vue
<script lang="ts" setup>
import { useUserStore } from '~/store/user'

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
import Foo from '~/pages/index.vue'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('should set the initial value', () => {
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
  expect(screen.getByText('Email: test@test.com')).toBeTruthy()
  expect(screen.getByText('Password: test')).toBeTruthy()
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

## [Storybook](https://storybook.js.org/docs) Setup
Install Storybook
```bash
npx storybook@latest init --type vue3 --builder vite
```

Add the following to scripts in package.json
```json
"scripts": {
  "storybook": "storybook dev -p 6006",
},
```

[NOTE](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#framework-specific-vite-plugins-have-to-be-explicitly-added): In Storybook 7, It would automatically add frameworks-specific Vite plugins, e.g. @vitejs/plugin-react if not installed. In Storybook 8 those plugins have to be added explicitly in the user's vite.config.ts:
```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```
Without the above configurration, the follwing error will occur.
```bash
 [vite] Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
```
Create the new vue file and new story like this.
```typescript
// src/pages/index.vue
<template>
  <div>
    Pages/index.vue
  </div>
</template>
```
```typescript
// src/pages/index.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
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
}

export default meta
```
Run the following command to start storybook, and then you can access http://localhost:6006/
```bash
npm run storybook
```
Install [@nuxtjs/storybook](https://storybook.nuxtjs.org/getting-started/setup) dependency to your project.
```bash
npx nuxi@latest module add storybook
```
Add the following to modules in nuxt.config.ts.
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/storybook'],
})
```

After installation this library, the following command will start nuxt and Storybook at the same time.
```bash
npm run dev
```

You can edit the storybook configuration with the storybook property in nuxt.config.ts.

Add the following to nuxt.config.ts. See [more options](https://storybook.nuxtjs.org/getting-started/options).
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  storybook: {
    host: 'http://localhost',
    port: 6006,
  },
})
```

### Import configuration
If you use an alias in a vue file, an error will occur like below when storybook is running.
```bash
TypeError: Failed to fetch dynamically imported module:
```
```ts
// foo.vue
import Foo from '~/components/Foo.vue'
```

Add an alias to viteFinal in .storybook/main.ts to avoid above error.
```ts
// .storybook/main.ts
import type { StorybookConfig } from "@storybook/vue3-vite";
import path from "path";

const config: StorybookConfig = {
  // add this
  viteFinal: async (config) => {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '~': path.resolve(__dirname, '../src'),
      }
    }
    return config
  },
};
```

### Nuxt auto import configuration
Storybook cannot import functions and components that are automatically imports by Nuxt.

Install the following library to import nuxt auto-imports functions and components in storybook.
```bash
npm install --save-dev unplugin-auto-import unplugin-vue-components
```
Add the following to viteFinal in .storybook/main.ts
```ts
// .storybook/main.ts
import AutoImportFunctions from "unplugin-auto-import/vite"
import AutoImportComponents from 'unplugin-vue-components/vite'

const config: StorybookConfig = {
  viteFinal: async (config) => {
    if (config?.plugins) {
      // Add this
      config.plugins.push(
        AutoImportFunctions ({ imports: [
          'vue',
          'vee-validate',
          'vue-router',
          'pinia',
        ], dts: '.storybook/auto-imports.d.ts' }),
      )
      // Add this
      config.plugins.push(
        AutoImportComponents({
          dirs: ['src/components'],
          dts: '.storybook/components.d.ts',
        }),
      )
    }
    return config
  },
}
```

### Using Pinia in Storybook
Storybook cannot use pinia by default.
The following error will occur when using pinia in vue file.
```
"getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
```
To aboid this, add the follwing to .storybook/preview.ts.
```ts
// .storybook/preview.ts
import { type Preview, setup } from '@storybook/vue3'
import type { App } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
})
```

If you want to set initial state in store, add the follwing to each story in storybook.
```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import Index from './index.vue'
import { useUserStore } from '~/store/user'

type Story = StoryObj<typeof Index>

const meta: Meta<typeof Index> = {
  title: 'Index',
}

export const Default: Story = {
  render: () => ({
    setup() {
      // add this
      const store = useUserStore()
      store.user.email = 'foo@bar.com'
      store.user.password = 'foobar'
    },
    components: { Index },
    template: '<Index />',
  }),
}

export default meta

```


### Using Vee-Validate in Storybook
Storybook cannot use Vee-Validate by default.
The following error will occur when using Vee-Validate in vue file.
```
Error: No such validator 'XXXX' exists.
```
To aboid this, add the follwing to .storybook/preview.ts.
```ts
// .storybook/preview.ts
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { all } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'

configure({
  generateMessage: localize({ en }),
})

Object.entries(all).forEach(([name, rule]) => {
  // import all validation-rules
  defineRule(name, rule)
})
```

### Mocking API Request in Storybook
Use msw to mock Rest and GraphQL requests right inside your story in storybook. With msw-storybook-addon, you can easily mock your APIs, making that process much simpler.
```bash
npm install --save-dev msw msw-storybook-addon
```

Run the following command to generate service worker. The service worker file will be created in public directory.
```bash
npx msw init public/
```



Enable MSW in Storybook by initializing MSW and providing the MSW decorator in ./storybook/preview.ts
```ts
// .storybook/preview.ts
import { initialize, mswLoader } from 'msw-storybook-addon'

// Initialize MSW
initialize()

const preview: Preview = {
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
}

export default preview
```

Then ensure the staticDirs property in your Storybook configuration will include the generated service worker file (in /public, by default).
```ts
// .storybook/main.ts
const config: StorybookConfig = {
  staticDirs: ['../public'],
}
export default config
```
Here is an example uses the fetch API to make network requests.
```ts
// src/pages/index.vue
<script lang="ts" setup>
import { useFetch } from '@vueuse/core'

const uuid = ref('')
const handleClick = async () => {
  const { data } = await useFetch('https://httpbin.org/uuid').json()
  uuid.value = data.value.uuid
}
</script>

<template>
  <div>
    <button @click="handleClick">Get uuid</button>
    <p>UUID = {{ uuid }}</p>
  </div>
</template>
```
```ts
// src/pages/index.stories.ts
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
```
msw-storybook-addon starts MSW with default configuration. If you want to configure it, you can pass options to the initialize function. They are the StartOptions from setupWorker.
A common example is to configure the onUnhandledRequest behavior, as MSW logs a warning in case there are requests which were not handled.
If you want MSW to bypass unhandled requests and not do anything:
```ts
// .storybook/preview.ts
import { initialize } from 'msw-storybook-addon';

initialize({
  onUnhandledRequest: 'bypass'
})
```

### Run interaction testing inside Storybook
Storybook's test addon allows you to test your components directly inside Storybook. It does this by using a Vitest plugin to transform your stories into Vitest tests using portable stories.

Before installing, make sure your project meets the following requirements:
- Storybook ≥ 8.4
- A Storybook framework that uses Vite (e.g. vue3-vite), or the Storybook Next.js framework
- Vitest ≥ 2.1

Run the following command to install and configure the addon, which contains the plugin to run your stories as tests using Vitest:
```bash
npx storybook add @storybook/experimental-addon-test
```
That add command will install and register the test addon. It will also inspect your project's Vite and Vitest setup, and install and configure them with sensible defaults, if necessary.
Make sure the following ts file have been created.
```ts
// vitest.workspace.ts
import path from 'path'
import { defineWorkspace } from 'vitest/config'
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { storybookVuePlugin } from '@storybook/vue3-vite/vite-plugin'
import AutoImportFunctions from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'

export default defineWorkspace([
  'vitest.config.ts',
  {
    extends: 'vite.config.ts',
    plugins: [
      storybookTest({ configDir: '.storybook' }),
      storybookVuePlugin(),
      // Add this to import nuxt-auto-imports functions
      AutoImportFunctions ({ imports: [
        'vue',
        'vee-validate',
        'vue-router',
        'pinia',
      ], dts: '.storybook/auto-imports.d.ts',
      }),
      // Add this to import nuxt-auto-imports components
      AutoImportComponents({
        dirs: ['src/components'],
        dts: '.storybook/components.d.ts',
      }),
    ],
    // Add this to resolve alias
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        name: 'chromium',
        provider: 'playwright',
      },
      include: ['**/*.stories.?(m)[jt]s?(x)'],
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
])
```
Add the follwing to scripts in package.json.
--project=storybook will run tests only stories.ts.
```json
"scripts": {
  "test:storybook": "vitest --project=storybook",
},
```

Here is an example.
```ts
// src/pages/index.vue
<script lang="ts" setup>
import { useFetch } from '@vueuse/core'

const uuid = ref('')
const handleClick = async () => {
  const { data } = await useFetch('https://httpbin.org/uuid').json()
  uuid.value = data.value.uuid
}
</script>

<template>
  <div>
    <input type="submit" value="Get uuid" @click="handleClick">
    <p>UUID = {{ uuid }}</p>
  </div>
</template>
```
```ts
// src/pages/index.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse } from 'msw'
import { within, userEvent, expect } from '@storybook/test'
import Index from './index.vue'

type Story = StoryObj<typeof Index>

const meta: Meta<typeof Index> = {
  title: 'Index',
}
export default meta

export const GetUuid: Story = {
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
  // Add this
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement)

    // Act
    await userEvent.click(await canvas.findByText('Get uuid'))

    // Assert
    await expect(await canvas.findByText('UUID = test uuid')).toBeInTheDocument()
  },
}
```
Run the following command to run tests.
```bash
npm run test:storybook
```

## E2E Testing By [Puppeteer](https://github.com/puppeteer/puppeteer)
Most things that you can do manually in the browser can be done using Puppeteer as E2E testing.
```bash
# install Puppeteer
npm install --save-dev puppeteer
```

Add the follwing to scripts in package.json.
```json
"scripts": {
  "test:e2e": "vitest ./src/tests/e2eTest/",
},
```
The following is an example implementation. When the email address and password are entered, the submit button is activated. This E2E test verifies whether the submit button is activated after inputting the information.
```ts
// src/pages/foo.vue
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
```ts
// ./src/tests/e2eTest/foo.spec.ts
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch } from 'puppeteer'
// If you can not import PuppeteerLaunchOptions, use LaunchOptions instead of PuppeteerLaunchOptions.
import type { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer'

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
          path: './src/tests/e2eTest/e2e-test.png',
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
      // Add lcov to collect coverage by SonarQube
      reporter: ['html', 'clover', 'text', 'lcov']
    },
    // Add this to analyze your test code by SonarQube
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
  }
})
```

Create sonar-project.properties in root directory and add the following to sonar-project.properties. See [this](https://docs.sonarqube.org/9.6/project-administration/narrowing-the-focus/) for more details.
```properties
sonar.projectKey=sample
sonar.projectName=sample
sonar.sources=src
sonar.tests=src/tests/
sonar.test.inclusions=src/tests/**/*.spec.ts
sonar.exclusions=**/*plugins*/**, src/tests/**/*.spec.ts, src/tests/**/setup.ts
sonar.testExecutionReportPaths=test-report.xml
sonar.javascript.file.suffixes=.js,.jsx
sonar.typescript.file.suffixes=.ts,.tsx,.vue
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.host.url=http://localhost:9000
sonar.token=sqp_XXXXXXXXXXXXXXXXXXXXXX
```

### Create a SonarQube project
Make sure you have installed SonarQube (v10.7) on your development machine.
Run SonarQube server as localhost:9000 before do the following.

To create a SonarQube project, do the following.
1. Access the following url.
http://localhost:9000/projects/create

1. Click [Create a local project]

1. Input __sample__ in Project display name and Project key. Click [Next]

1. Select [Use the global setting] and click [Create project]

1. Click [Locally]

1. Click [Generate] and then copy the generated project token

### Analyze your source code
Add project token to sonar.token in sonar-project.properties.
See [this](https://docs.sonarqube.org/latest/user-guide/user-account/generating-and-using-tokens/) for more details of token.
```properties
sonar.token=sqp_XXXXXXXXXXXXXXXXXXXXXX
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
# run SonarQube analysis
npm run sonar
```

You can access the following url to show result.

http://localhost:9000/dashboard?id=nuxt3-starter-guide