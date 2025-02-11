# React OTC Order Management SPA

## Overview

This project is a React-based OTC (Over-the-Counter) order management Single Page Application (SPA).

## Deploy Preview

This project is deployed using Vercel. You can view the latest deployment here: [Live Preview](https://otc-react.vercel.app/).

## Tech Stack

- **React** (18.3.1)
- **Zustand** for state management
- **React Query** for API data fetching
- **React Router** for navigation
- **MUI (Material UI)** for UI components
- **React Hook Form** for form validation
- **Day.js** for date and time handling
- **ESLint & Prettier** for code formatting and linting
- **Husky** for validating formatting on commit

## Setup

### Prerequisites

Make sure you have Node.js installed. Then, install the project dependencies:

```sh
npm install
```

### Running the Project

To start the development server:

```sh
npm run dev
```

## Key Libraries & Documentation

- **React Hook Form** (form validation): [Docs](https://react-hook-form.com/docs)
- **@hookform/error-message** (form error handling): [Docs](https://www.npmjs.com/package/@hookform/error-message)
- **Day.js** (date manipulation):
  - UTC Plugin: [Docs](https://day.js.org/docs/en/plugin/utc)
  - Timezone Plugin: [Docs](https://day.js.org/docs/en/timezone/timezone)
- **CoinGecko API** (crypto price data): [Docs](https://docs.coingecko.com/reference/simple-price)
  - Note: Without an API Key, the rate limit for API calls is low but sufficient for testing.

## Folder Structure

```
/src
  ├── common         # Shared utilities and configurations
  │   ├── api        # API service handlers
  │   ├── helpers    # Helper functions
  │   ├── types      # TypeScript type definitions
  ├── components     # Reusable UI components
  ├── hooks          # Custom React hooks
  ├── pages          # Application views/pages
  ├── providers      # Context and application providers
  ├── state          # Zustand state management
  ├── AppRouter.tsx  # Application routing setup
  ├── main.tsx       # Entry point
```
