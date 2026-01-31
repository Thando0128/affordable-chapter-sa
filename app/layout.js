export const metadata = {
  title: "Affordable Chapter SA",
  description: "Find affordable cars in South Africa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, Arial" }}>
        {children}
      </body>
    </html>
  );
}
