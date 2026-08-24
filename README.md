# Focus Todo

Focus Todo is a responsive task dashboard for organizing work, personal, and education tasks. It runs entirely in the browser and keeps task and theme preferences on the current device.

## Features

- Create, edit, complete, and delete tasks
- Search and combine status, category, and priority filters
- Sort active and completed tasks by due date
- Highlight overdue, due-today, and upcoming tasks
- Persistent tasks and theme preference
- Light and dark themes with system-theme detection
- Responsive statistics and task views
- Accessible modal, form validation, controls, and status announcements

## Technologies

- React 19
- JavaScript and JSX
- Vite 8
- Tailwind CSS 4
- ESLint
- Browser LocalStorage

## Local Setup

Requirements: a current Node.js release and npm.

```bash
npm install
npm run dev
```

Quality and production commands:

```bash
npm run lint
npm run build
```

Use `npm run preview` to inspect the production build locally.

## Project Structure

```text
src/
├── components/   Reusable layout, task, and UI components
├── constants/    Shared task options
├── hooks/        LocalStorage state hook
├── utils/        Date, filtering, and sorting helpers
├── App.jsx       Application state and behavior
├── main.jsx      React entry point
└── index.css     Tailwind setup and global styles
```

## LocalStorage Keys

- `focus-todo-tasks`: task records
- `focus-todo-theme`: `light` or `dark` theme preference

## Screenshot

Add an up-to-date application screenshot here before publishing the repository.

## Live Demo

Live demo URL: _To be added after deployment._

## Netlify

Use these build settings:

- Build command: `npm run build`
- Publish directory: `dist`
