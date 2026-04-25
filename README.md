# Genesis Frontend

A modern React + Vite frontend for a task and productivity dashboard application with authentication, todo management, calendar view, and flexible page navigation.

## Overview

This project is a single-page application built with React, TypeScript, Tailwind CSS, and Vite. It includes:

- User authentication (login/register)
- Protected app routes and public route guards
- Dashboard, todos, completed tasks, important tasks, search, calendar, settings, help, and account pages
- Backend API integration using Axios and `@tanstack/react-query`
- Toast notifications and theme support

## Features

- Login / Register pages with protected routes
- Dashboard summary page
- Todo list management with create, update, delete, complete, and important task actions
- Search experience for tasks
- Completed and important task views
- Calendar page with date-based task display
- Account and settings pages
- Responsive layout with sidebar navigation and top navbar

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- @tanstack/react-query
- React Toastify
- Radix UI primitives
- React Beautiful DnD
- Moment + Moment Timezone

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root or set environment variables as needed.

3. Add the backend API base URL:

```env
VITE_BACK_END_BASE_URL=http://localhost:8000
```

4. Start the development server:

```bash
npm run dev
```

5. Open the app in your browser at the URL shown by Vite (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the production-ready app
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint across the project

## Backend Integration

This frontend expects a backend API with the following behavior:

- `POST /register/` - user registration
- `POST /token/` - login and access token retrieval
- `GET /dashboard/` - dashboard data
- `GET /todo/` - list todos
- `GET /todo-detail/:id/` - todo details
- `PATCH /todo-completed/:id/` - mark todo complete
- `POST /todo/` - create todo
- `PATCH /todo-detail/:id/` - update todo
- `DELETE /todo-detail/:id/` - delete todo
- `PATCH /todo-important/:id/` - toggle important state

The base API URL is configured with the `VITE_BACK_END_BASE_URL` environment variable.

## Project Structure

- `src/` - application source code
  - `components/` - page and UI components
  - `hooks/` - custom React hooks
  - `services/` - API client and backend calls
  - `lib/` - utility functions
  - `App.tsx` - route configuration
  - `main.tsx` - app bootstrap

  ### Contribution Guidelines

- Follow the existing code style and TypeScript conventions
- Make sure the app builds without errors (`npm run build`)
- Keep pull requests focused — one feature or fix per PR
- Write clear, descriptive commit messages

## Notes

- Ensure the backend supports JWT access tokens and that they are stored in `localStorage`.
- The app uses React Router route guards (`AuthGuard` and `PublicGuard`) to protect authenticated routes.
- Tailwind styling is configured via `tailwind.config.js`.
