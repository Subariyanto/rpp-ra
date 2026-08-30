/**
 * Utility helper for robust printing in web applications and iframe environments.
 * Handles printing via hidden iframe, new window fallback, and downloadable HTML.
 */

export interface PrintDocumentOptions {
  title?: string;
  orientation?: 'portrait' | 'landscape';
  autoPrint?: boolean;
}

/**
 * Direct print using an isolated hidden iframe.
 * This guarantees clean printing without modal artifacts, navigation bars, or iframe parent clipping.
 */
export function printHtmlViaIframe(htmlContent: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      // Remove any existing print frame
      const existingFrame = document.getElementById('ra-print-iframe');
      if (existingFrame) {
        existingFrame.remove();
      }

      const iframe = document.createElement('iframe');
      iframe.id = 'ra-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      iframe.setAttribute('aria-hidden', 'true');

      document.body.appendChild(iframe);

      const frameDoc = iframe.contentWindow?.document || iframe.contentDocument;
      if (!frameDoc) {
        throw new Error('Cannot access iframe document');
      }

      frameDoc.open();
      frameDoc.write(htmlContent);
      frameDoc.close();

      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            resolve(true);
          } catch (printErr) {
            console.warn('Iframe print error:', printErr);
            // Fallback to window print
            window.print();
            resolve(false);
          } finally {
            // Clean up after 60 seconds
            setTimeout(() => {
              iframe.remove();
            }, 60000);
          }
        }, 300);
      };

      // Fallback timeout in case onload doesn't fire immediately
      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          resolve(true);
        } catch (e) {
          // ignore
        }
      }, 1000);
    } catch (err) {
      console.warn('printHtmlViaIframe failed, trying fallback', err);
      try {
        window.focus();
        window.print();
      } catch (e) {
        console.error('window.print also failed', e);
      }
      resolve(false);
    }
  });
}

/**
 * Opens the printable HTML document in a new tab/window.
 * If popups are blocked, provides fallback.
 */
export function openHtmlInNewTab(htmlContent: string): boolean {
  try {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.focus();
      return true;
    }
  } catch (err) {
    console.warn('window.open with blob failed', err);
  }

  try {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      newWindow.focus();
      return true;
    }
  } catch (e) {
    console.warn('window.open write failed', e);
  }

  return false;
}

/**
 * Downloads the HTML document so the user can open it anywhere.
 */
export function downloadHtmlFile(htmlContent: string, fileName: string): void {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName.endsWith('.html') ? fileName : `${fileName}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
