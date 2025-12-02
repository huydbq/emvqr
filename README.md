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

- ✅ Parse EMVCo QR payloads into structured TLV fields
- ✅ Support for nested templates (tags 26-51 and 62)
- ✅ Comprehensive tag label mapping
- ✅ Responsive design
- ✅ Component-based architecture
- ✅ Built-in JSON beautifier route with text/tree toggle + collapsible nodes
- ✅ Modular utilities for easy testing and reuse

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

Visit `/json-beautifier` (or use the header navigation) to validate JSON, beautify/minify the payload, and flip between a formatted text block or an interactive tree view with per-node collapse controls for inspecting nested structures.

### Utilities

- **`parseEmvTlv()`**: Parses raw EMV payload into TLV objects
- **`flattenEmvFields()`**: Flattens nested TLV structures for display
- **`escapeHtml()`**: Safely escapes HTML characters

## Components

- **Header**: Displays title and description
- **InputSection**: Handles payload input and parsing triggers
- **ResultsTable**: Shows parsed EMV fields in table format
- **JsonTree**: Renders nested JSON data for the beautifier route
- **EmvParserPage**: Main TLV parsing workflow
- **JsonBeautifierPage**: JSON helper with beautify/minify + tree toggle
- **Footer**: Static footer with info

## Safe to Use

This is a completely client-side application. No data is sent to any server. Safe to host on GitHub Pages or any static hosting.
