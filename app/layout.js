export const metadata = {
  title: 'LogNList',
  description: 'Log it. List it. Find it again.',
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
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, fontFamily: fontStack }}>{children}</body>
    </html>
  );
}
