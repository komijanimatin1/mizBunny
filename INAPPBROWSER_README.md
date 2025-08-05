# InAppBrowser Button Configuration

## Overview
The InAppBrowser now supports independent control of the AI button and three-dot menu button in the footer.

## Button Options

### AI Button (`injectbutton`)
- **Purpose**: Opens a modal WebView for AI functionality
- **Values**: `yes` | `no`
- **Default**: `no`
- **Functionality**: When enabled, shows a purple "AI" button that opens a modal overlay

### Menu Button (`menu`)
- **Purpose**: Shows a three-dot menu with navigation options (Forward, Refresh)
- **Values**: `yes` | `no`
- **Default**: `no`
- **Functionality**: When enabled, shows a gray three-dot button that opens a dropdown menu

## Usage Examples

### Both buttons enabled
```javascript
await openBrowser(url, '_blank', 'injectbutton=yes,menu=yes');
```

### Only AI button
```javascript
await openBrowser(url, '_blank', 'injectbutton=yes,menu=no');
```

### Only menu button
```javascript
await openBrowser(url, '_blank', 'injectbutton=no,menu=yes');
```

### No buttons
```javascript
await openBrowser(url, '_blank', 'injectbutton=no,menu=no');
```

## Implementation Details

The buttons are now completely independent:
- The AI button (`injectbutton=yes`) will show regardless of the menu setting
- The menu button (`menu=yes`) will show regardless of the inject button setting
- Both buttons can be enabled/disabled independently
- Proper spacing is maintained when both buttons are present

## Footer Layout

When both buttons are enabled, the footer layout is:
```
[AI Button] [Spacer] [Menu Button] [Title] [Close Button]
```

When only one button is enabled, the layout adjusts accordingly:
```
[AI Button] [Title] [Close Button]  // Only AI button
[Menu Button] [Title] [Close Button]  // Only menu button
``` 