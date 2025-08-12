# IRANYekanX Font Usage Guide

This guide explains how to use the IRANYekanX font family in your Ionic/React project.

## Font Setup

The IRANYekanX fonts have been configured in your project with the following files:

- `src/theme/fonts.css` - Font face declarations and CSS variables
- `src/index.css` - Font import and default body font
- `src/theme/variables.css` - Ionic theme integration

## Available Font Weights

The following font weights are available:

| Weight | CSS Class | CSS Variable | Description |
|--------|-----------|--------------|-------------|
| 100 | `.font-thin` | `--font-weight-thin` | Thin |
| 200 | `.font-ultra-light` | `--font-weight-ultra-light` | Ultra Light |
| 300 | `.font-light` | `--font-weight-light` | Light |
| 400 | `.font-regular` | `--font-weight-regular` | Regular |
| 500 | `.font-medium` | `--font-weight-medium` | Medium |
| 600 | `.font-demi-bold` | `--font-weight-demi-bold` | Demi Bold |
| 700 | `.font-bold` | `--font-weight-bold` | Bold |
| 800 | `.font-extra-bold` | `--font-weight-extra-bold` | Extra Bold |
| 900 | `.font-heavy` | `--font-weight-heavy` | Heavy |
| 950 | `.font-black` | `--font-weight-black` | Black |
| 1000 | `.font-extra-black` | `--font-weight-extra-black` | Extra Black |

## Usage Methods

### 1. Using CSS Classes (Recommended)

```jsx
// Basic usage with font family and weight
<h1 className="font-iranyekan font-bold">سلام دنیا! Hello World!</h1>

// Different weights
<p className="font-iranyekan font-light">Light text</p>
<p className="font-iranyekan font-medium">Medium text</p>
<p className="font-iranyekan font-bold">Bold text</p>
```

### 2. Using CSS Variables

```css
.my-custom-text {
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-bold);
}
```

### 3. Using Inline Styles

```jsx
<h1 style={{ 
  fontFamily: 'var(--font-family-primary)', 
  fontWeight: 'var(--font-weight-bold)' 
}}>
  Custom styled text
</h1>
```

### 4. Using Variable Font

The variable font version allows for any weight between 100-1000:

```jsx
<p className="font-iranyekan-variable" style={{ fontWeight: 250 }}>
  Variable font with custom weight
</p>
```

## Font Families

- `IRANYekanX` - Standard font family with individual weight files
- `IRANYekanX-Variable` - Variable font family (single file, all weights)

## CSS Variables Available

```css
/* Font families */
--font-family-primary: 'IRANYekanX', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-family-variable: 'IRANYekanX-Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Font weights */
--font-weight-thin: 100;
--font-weight-ultra-light: 200;
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-demi-bold: 600;
--font-weight-bold: 700;
--font-weight-extra-bold: 800;
--font-weight-heavy: 900;
--font-weight-black: 950;
--font-weight-extra-black: 1000;
```

## Examples

### Headings
```jsx
<h1 className="font-iranyekan font-bold">Main Heading</h1>
<h2 className="font-iranyekan font-demi-bold">Sub Heading</h2>
<h3 className="font-iranyekan font-medium">Section Heading</h3>
```

### Body Text
```jsx
<p className="font-iranyekan font-regular">Regular body text</p>
<p className="font-iranyekan font-light">Light body text</p>
```

### Buttons
```jsx
<button className="font-iranyekan font-medium">
  Click me
</button>
```

### Cards
```jsx
<div className="card">
  <h3 className="font-iranyekan font-bold">Card Title</h3>
  <p className="font-iranyekan font-regular">Card content</p>
</div>
```

## Performance Optimization

The fonts are configured with `font-display: swap` for better performance. This means:

1. Text will be visible immediately using a fallback font
2. The custom font will load in the background
3. Once loaded, it will swap in seamlessly

## Browser Support

- Modern browsers support all font weights
- Variable font support: Chrome 66+, Firefox 62+, Safari 11.1+, Edge 17+
- Fallback fonts are provided for older browsers

## Testing the Fonts

You can test the fonts by importing and using the `FontExample` component:

```jsx
import FontExample from './components/FontExample';

// In your component
<FontExample />
```

This will display examples of all font weights and usage patterns.

## Troubleshooting

If fonts don't load:

1. Check that the font files exist in the `public/font/` directory
2. Verify the file paths in `src/theme/fonts.css`
3. Check browser developer tools for any 404 errors
4. Ensure the font import is included in `src/index.css`

## Notes

- The fonts use Farsi numerals which are optimized for Persian/Arabic text
- The variable font version is more efficient but may not be supported in all browsers
- All fonts include proper fallbacks for better user experience 