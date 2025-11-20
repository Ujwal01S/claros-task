# Dashboard - React + TypeScript + Vite

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev

# Build for production
pnpm run build
```

App runs at `http://localhost:5173`

## ✨ Features

- **Shopping Cart** - Add/remove products, persistent storage with Redux
- **Product Management** - Search, filter, paginate products
- **Data Tables** - Sortable columns, filters, pagination (TanStack Table)
- **Category & User Management** - CRUD operations

## 🛠️ Tech Stack

- React 18 + TypeScript + Vite
- Redux Toolkit + Redux Persist
- TanStack Query (React Query)
- TanStack Table
- Tailwind CSS + shadcn/ui
- React Router v7
- Axios

## 🌐 API Integration

API FROM: `https://fakeapi.platzi.com/en`
Base API: `https://api.escuelajs.co/api/v1`

- Filter through api only available for product
- User api some user are not allowed to delete respective api error response is shown in toast
- Category api categories used in products are not allowed to delete

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── functions/         # API functions (category, products, users)
│   ├── hooks/             # React Query hooks
│   └── urls/              # API endpoint URLs
├── components/            # React components
│   ├── commons/          # Reusable components (cards, buttons, etc.)
│   ├── data/             # Data table components
│   ├── data-table/       # Table utilities (filters, pagination)
│   ├── layout/           # Layout components (sidebar, header)
│   └── ui/               # shadcn/ui components
├── config/               # App configuration
├── constants/            # Constants (routes, messages, etc.)
├── hooks/                # Custom hooks
│   ├── query-params/    # URL query param hooks
│   └── table-columns/   # Table column definitions
├── pages/                # Page components
│   ├── home/            # Home & products pages
│   ├── cart/            # Shopping cart page
│   └── data/            # Category & user pages
├── routes/               # Route configuration
├── services/             # API service (axios instance)
├── store/                # Redux store
│   └── slices/          # Redux slices (cart, delete dialog)
├── types/                # TypeScript types
└── utils/                # Utility functions
```
