import "./globals.css";

export const metadata = {
  title: "Trustflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
