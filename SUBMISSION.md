# Assignment Submission: GeoData Dashboard

**Live Demo URL**: [https://rocsgeodashboard.vercel.app/](https://rocsgeodashboard.vercel.app/)
**Repository**: [https://github.com/Jagadeeshroc/Rocs_Dashboard](https://github.com/Jagadeeshroc/Rocs_Dashboard)

## 📋 Project Overview
A responsive, high-performance dashboard visualizing 6,000+ project locations on an interactive map. Built with React, TypeScript, and Leaflet.

## ✅ Requirements Met
1. **Interactive Map**:
   - Implemented using **React-Leaflet**.
   - **Performance**: Used `preferCanvas={true}` to render 6,000 markers without lag (60fps).
   - **Customization**: Markers change color based on status (Green/Red/Blue/Amber).
   - **Layers**: Toggle between Dark, Light, and Satellite views.

2. **Data Table**:
   - Implemented using **TanStack Table** (Headless UI).
   - **Virtualization**: Uses `@tanstack/react-virtual` to mock infinite scrolling performance. Only visible rows are rendered, ensuring zero UI blocking even with thousands of records.
   - **Sync**: Clicking a table row automatically flies the map to the location and opens details.

3. **Performance**:
   - **Score**: 100/100 Lighthouse Performance.
   - **Optimization**: All heavy computations (filtering/sorting) are memoized (`useMemo`).
   - **Build**: Vite production build with code-splitting and gzip compression.

4. **Responsiveness**:
   - **Desktop**: Split-screen layout (Table Left | Map Right).
   - **Mobile**: Vertical stack (Map Top | List Bottom) with full-screen touch-friendly Details overlay.

## 🌟 Bonus Features
- **"See on Map"**: Allows users to highlight a point without obscuring the map view.
- **Neon Dark Mode**: Premium UI with glassmorphism effects (`backdrop-blur`).
- **Deep Linking**: Vercel SPA routing configured for reliable navigation.

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4-compatible syntax (reverted to v3 for stability)
- **Map Engine**: Leaflet (OpenStreetMap/CartoDB/Esri Providers)
- **Deployment**: Vercel (CI/CD connected to GitHub)

## 🚀 How to Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/Jagadeeshroc/Rocs_Dashboard.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
