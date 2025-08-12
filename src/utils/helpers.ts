// Utility helper functions

/**
 * Safely opens a URL in the in-app browser
 */
export const safeOpenUrl = async (
  url: string, 
  openBrowser: (url: string, target: string, options: string) => Promise<void>,
  title: string,
  options?: string
) => {
  try {
    const defaultOptions = 'location=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=' + title + ',menu=yes,hardwareback=yes';
    await openBrowser(url, '_blank', options || defaultOptions);
  } catch (err) {
    console.error('Failed to open URL:', err);
    throw err;
  }
};

/**
 * Formats a title for display
 */
export const formatTitle = (title: string): string => {
  return title.trim();
};

/**
 * Validates if a URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
