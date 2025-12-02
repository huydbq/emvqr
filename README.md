# EMVCo QR Parser - React Edition

A clean, modular React application for parsing EMVCo QR codes into TLV (Tag-Length-Value) fields.

## Project Structure

```
src/
├── components/          # Shared React components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── InputSection.jsx
│   ├── ResultsTable.jsx
│   └── JsonTree.jsx
├── pages/
│   ├── EmvParserPage.jsx
│   └── JsonBeautifierPage.jsx
├── utils/              # Utility functions
│   ├── parser.js       # EMV TLV parsing logic
│   └── tags.js         # EMV tag definitions
├── styles/             # Component-specific CSS
│   ├── Header.css
│   ├── Footer.css
│   ├── InputSection.css
│   └── ResultsTable.css
├── App.jsx             # Main app component
├── App.css             # App styling
├── index.css           # Global styles
└── main.jsx            # React entry point
```

## Features

- ✅ EMVCo TLV parser with nested template support (tags 26-51 + 62)
- ✅ Rich tag metadata sourced from `tags.js`
- ✅ Responsive two-panel layout with persistent status messaging
- ✅ JSON Beautifier route for prettify/minify/validation
- ✅ Dual JSON outputs:
  - **Text mode**: max-height 700px, always-on horizontal scrollbar, copy button, and wrapping for long values
  - **Tree mode**: collapsible nodes, breadcrumb path, auto-scroll to selection, and pills that expand with content
- ✅ Componentized architecture for easy reuse/testing

## Getting Started

### Development

```bash
npm install
npm run dev
```

The dev server will start at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

## How It Works

1. **Input**: User pastes an EMVCo QR payload (hex string)
2. **Parse**: Application parses the TLV structure
3. **Display**: Shows formatted results in an interactive table with tag descriptions

### JSON Beautifier Route

Navigate to `/json-beautifier` (or use the header nav) to:

1. Paste JSON, then beautify or minify it with instant validation feedback.
2. Copy formatted output directly from the toolbar.
3. Toggle between text view (wrapping lines, persistent horizontal scrollbar, smooth vertical scroll) and a tree inspector that:
   - Shows the current JSON path
   - Lets you expand/collapse nodes
   - Scrolls the selected node into view
   - Keeps pills sized to their content for ultra-long keys/values

### Utilities

- **`parseEmvTlv()`**: Parses raw EMV payload into TLV objects
- **`flattenEmvFields()`**: Flattens nested TLV structures for display
- **`buildEmvTree()`**: Produces a nested data structure for the JSON tree view
- **`escapeHtml()`**: Safely escapes HTML characters

## Components

- **Header**: Route-aware title, description, and navigation
- **InputSection**: Handles payload input, parse/clear controls, and live status
- **ResultsTable**: Displays TLV rows with tag badges, lengths, and meanings
- **JsonTree**: Breadcrumb + collapsible inspector with auto-scroll and pill resizing
- **EmvParserPage**: Main TLV parsing workflow (input + results card)
- **JsonBeautifierPage**: JSON helper with text/tree view, copy button, and scroll-locked panels
- **Footer**: Static footer with year + stack info

## Safe to Use

This is a completely client-side application. No data is sent to any server. Safe to host on GitHub Pages or any static hosting.
