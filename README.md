# GeoData Dashboard

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://rocsgeodashboard.vercel.app/)

A high-performance React application to visualize spatial and tabular data.

## Features
- **Interactive Map**: Plotting 5000+ data points using Leaflet.
- **Virtualized Data Table**: Handling large datasets smoothly using TanStack Virtual.
- **Bi-directional Sync**: Clicking a row highlights the map marker; clicking a marker highlights the table row.
- **Filtering & Search**: Client-side filtering by Project Name and Status.
- **Responsive Design**: Premium dark-mode UI built with Tailwind CSS.

## Tech Stack
- **Framework**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS
- **Map**: React Leaflet (Leaflet)
- **Table Logic**: TanStack Table (v8) + TanStack Virtual (v3)
- **Icons**: Lucide React

## Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173`.

## Architecture Decisions
1. **Performance**: 
   - Used `CircleMarker` instead of standard `Marker` Icon in Leaflet. Standard markers create DOM elements with images which can be heavy for 5000 points. Canvas rendering (`preferCanvas={true}`) is enabled for MapContainer to further optimize rendering.
   - The Data Table is virtualized to only render the visible rows, ensuring the DOM remains light even with 5000 records.
2. **State Management**:
   - Local state (`useState`, `useMemo`) is used as requested (No Redux). The `Dashboard` component acts as the main controller.
3. **Data**:
   - Mock data is generated purely on the client-side (`src/utils/mockData.ts`) to simulate a fresh dataset on each load.


## Deployment
- **GitHub Pages**: Supported (via `gh-pages` branch).
- **Vercel**: Supported (auto-detects from `main` branch).
  - *Note*: `vite.config.ts` base path must be set to `/` for Vercel.

## Time Spent
- **Initialization & Config**: 10 mins (Vite, Tailwind, Dependencies)
- **Core Components**: 20 mins (Map, Table, Dashboard)
- **Refining & Fixes**: 10 mins (TypeScript strictness, Build verification)
- **Deployment Setup**: 20 mins (GitHub Actions, Vercel Config)
- **Total**: ~60 Minutes
