# Tab Rank Web

A real-time gaming ranking platform where players can create games, join lobbies, and track their match results with an integrated ranking system.

## Description

Tab Rank Web is a modern web application built with React and TypeScript that allows users to manage gaming sessions. Players can create custom games, join lobbies with friends, register match results, and view rankings in real-time using WebSocket connections.

## Screenshots

<div style="display: flex; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/e219e64f-23aa-4a2a-972d-4677a3024386" width="150" />
  <img src="https://github.com/user-attachments/assets/65d9ab33-086c-400f-8868-7189029428c2" width="150" />
  <img src="https://github.com/user-attachments/assets/fd4c7623-d2c9-488e-9029-4b00eab35b17" width="150" />
  <img src="https://github.com/user-attachments/assets/6ad413c7-dba8-431a-be32-0f7e9811d9d9" width="150" />
</div>


## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **React Router** - Navigation
- **Socket.io** - Real-time communication
- **React Hook Form + Zod** - Form handling and validation
- **Axios** - HTTP client

## Project Structure

```
src/
├── assets/              # Static assets
├── components/          # Reusable UI components
│   └── ui/             # Shadcn UI components
├── layouts/            # Layout components
│   └── auth-layout/    # Authentication layout
├── lib/                # Utility functions
├── modules/            # Feature modules
│   ├── auth/          # Authentication module
│   ├── core/          # Core functionality (API, routes, theme)
│   ├── game/          # Game management
│   ├── lobby/         # Lobby management
│   ├── match/         # Match tracking
│   └── user/          # User management
└── pages/              # Application pages
    ├── create-game/   # Game creation page
    ├── create-lobby/  # Lobby creation page
    ├── game/          # Game details and ranking
    ├── home/          # Home page
    ├── join-lobby/    # Join lobby page
    ├── lobby/         # Lobby room
    ├── profile/       # User profile
    ├── sign-in/       # Sign in page
    ├── sign-up/       # Sign up page
    └── not-found/     # 404 page
```

## How to Setup

### Prerequisites

- Node.js 24.11.1
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd web-tab-rank
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your API URL:
```
VITE_API_URL=http://localhost:3333/api
```

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Lint:
```bash
npm run lint
```

## Author

**Jhones Jhonatas**
Email: jhonesjhonatas@outlook.com.br
