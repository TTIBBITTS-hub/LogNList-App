export const metadata = {
  title: 'LogNList',
  description: 'Log it. List it. Find it again.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const fontStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Form controls don't inherit font-family from body by default.
                 <textarea> falls back to monospace, inputs/buttons to UA defaults.
                 This forces them all onto the app's font stack. */
              input, textarea, select, button {
                font-family: inherit;
              }

              /* Stops the page from "rubber-banding" past the top/bottom edge
                 in Safari on iOS, which is what triggers the compact address-bar
                 pill to pop up when you pull down. */
              html, body {
                overscroll-behavior-y: none;
              }
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, fontFamily: fontStack, overscrollBehaviorY: 'none' }}>{children}</body>
    </html>
  );
}
