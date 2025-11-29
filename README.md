# EMVCo QR Parser - React Edition

A clean, modular React application for parsing EMVCo QR codes into TLV (Tag-Length-Value) fields.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # App header
│   ├── Footer.jsx      # App footer
│   ├── InputSection.jsx # Input area with parse button
│   └── ResultsTable.jsx # Results display table
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

### Utilities

- **`parseEmvTlv()`**: Parses raw EMV payload into TLV objects
- **`flattenEmvFields()`**: Flattens nested TLV structures for display
- **`escapeHtml()`**: Safely escapes HTML characters

## Components

- **Header**: Displays title and description
- **InputSection**: Handles payload input and parsing triggers
- **ResultsTable**: Shows parsed fields in table format
- **Footer**: Static footer with info

## Safe to Use

This is a completely client-side application. No data is sent to any server. Safe to host on GitHub Pages or any static hosting.
