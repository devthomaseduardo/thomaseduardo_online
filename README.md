<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# portfolio_novo

This repository is now organized into separate frontend and backend workspaces:

- `frontend/`: Vite + React application
- `backend/`: Express server, Prisma database layer, and backend scripts

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Start development servers:
   `npm run dev`
3. Or run the pieces individually:
   - `npm run dev:frontend`
   - `npm run dev:backend`

## Notes

- Use `backend/package.json` for server-specific commands and database seeding.
- Use `frontend/package.json` for Vite build, preview, and asset tools.
