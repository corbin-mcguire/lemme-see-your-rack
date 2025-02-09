# 🍈 Lemme See Your Rack (LSYR)

A modern, interactive server rack visualization tool built with React and Vite. This application helps you plan and visualize server rack layouts with a drag-and-drop interface.

## Features

- 🎨 Visual rack layout designer with customizable colors
- 🔄 Drag-and-drop functionality for easy rack item reordering
- 💾 Persistent storage of rack configurations
- 📏 Configurable rack sizes (1U to 44U)
- 🔗 Support for product links and price tracking
- 🎯 Real-time validation for rack space management

## Tech Stack

- React 19
- Vite 6
- TailwindCSS
- DND Kit for drag-and-drop functionality
- Zustand for state management

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/lemme-see-your-rack.git
cd lemme-see-your-rack
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The production build will be in the `dist` directory.

## Usage

1. Set your desired rack size using the dropdown menu
2. Add new items to your rack by filling out the form with:
   - Name of the equipment
   - Number of rack units (U)
   - Color for visualization
   - Price (optional)
   - Product link (optional)
3. Drag and drop items to reorder them in the rack
4. Click the delete button on any item to remove it

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Drag and drop powered by [DND Kit](https://dndkit.com/)
- Styling with [TailwindCSS](https://tailwindcss.com/)