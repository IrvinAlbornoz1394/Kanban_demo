# Kanban Demo

> Aplicación Kanban desarrollada con React, TypeScript, Vite y Redux Toolkit.

## Descripción

Esta aplicación permite gestionar tableros, columnas y tareas al estilo Kanban. Permite crear, editar y eliminar boards, columnas y tareas, así como organizar tareas mediante drag & drop. Incluye persistencia local y pruebas automatizadas.

## Tecnologías principales

- React 18
- TypeScript
- Vite
- Redux Toolkit
- styled-components
- Jest
- ESLint

## Instalación y uso

1. Clona el repositorio:
  ```bash
  git clone <url-del-repo>
  cd Kanban_demo
  ```
2. Instala las dependencias:
  ```bash
  npm install
  ```
3. Inicia la aplicación en modo desarrollo:
  ```bash
  npm run dev
  ```
4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Scripts útiles

- `npm run dev` – Inicia el servidor de desarrollo
- `npm run build` – Genera la build de producción
- `npm run test` – Ejecuta las pruebas

## Estructura del proyecto

```
src/
  app/            # Configuración de store y hooks
  components/     # Componentes reutilizables (Board, Column, Task, UI, etc.)
  features/       # Slices de Redux para boards, columns, tasks, ui, workspaces
  hooks/          # Custom hooks
  pages/          # Páginas principales (BoardPage, etc.)
  styles/         # Estilos globales y theming
  types/          # Tipos TypeScript
  utils/          # Utilidades
```

## Pruebas

Las pruebas están ubicadas en `src/__tests__/`. Ejecuta `npm run test` para correrlas con Jest.

## Créditos

Desarrollado por Irvin. Basado en buenas prácticas de React y Redux.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
