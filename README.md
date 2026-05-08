# 🇮🇳 ElectViz: Parliament of India Dashboard

ElectViz is a professional, high-performance web application designed to provide a comprehensive and interactive visualization of the Indian Parliamentary results. It offers a unified "at-a-glance" view of the political landscape, covering both the **Lok Sabha** (Lower House) and **Rajya Sabha** (Upper House).

## 🚀 Key Features

### 📍 Interactive National Map
- **Political Dominance View:** States are color-coded based on the ruling or leading political party (e.g., NDA Orange, INDIA Blue).
- **Hover Summaries:** Instant tooltips showing total seats and the leading party for every state and union territory.
- **Drill-Down Capability:** Click on any state to "zoom in" and explore granular, constituency-level details.

### 🏛️ Parliament Seat Map (Constituency Grid)
- **Visual Grid:** A professional grid representation of every seat in a selected state.
- **Winner Details:** Hover over individual seats to see the constituency name, winning candidate, and victory margin.
- **Party Breakdown:** Sidebar summary of seat distribution within the state with visual progress bars.

### 🌓 Dual-House Experience
- **One-Page Dashboard:** Seamlessly toggle between Lok Sabha and Rajya Sabha views without page reloads.
- **House Composition:** Specialized pie and bar charts showing the unique structure and party distribution of each house.
- **Historical Trends:** Comparison of party performance across the last three general elections (2014, 2019, 2024).

### 👤 National & State Governance
- **National Leadership:** Dedicated panel showcasing the President of India, Prime Minister, and key Union Cabinet Ministers with HD portraits.
- **State Leadership:** State-specific governance cards showing the Chief Minister, Deputy CMs, and Cabinet portfolios.
- **Robust Avatars:** Custom `LeaderAvatar` system with 100% reliable SVG fallbacks to ensure a professional look even if images are blocked.

## 🛠️ Technology Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for type-safe data handling.
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) for modern, responsive UI.
- **Maps:** [React Simple Maps](https://www.react-simple-maps.io/) with TopoJSON.
- **Charts:** [Recharts](https://recharts.org/) for interactive data visualizations.
- **Icons:** [Lucide React](https://lucide.dev/).

## 🚦 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ankushthevar/ElectViz.git
   cd ElectViz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## 📁 Project Structure

- `src/app`: Next.js pages and API routes.
- `src/components/charts`: Interactive map and data visualization components.
- `src/components/ui`: Reusable UI elements like Cards and Avatars.
- `src/lib/mockData.ts`: Centralized, expert-verified election and governance data.

## 📝 License

This project is open-source and available under the MIT License.
