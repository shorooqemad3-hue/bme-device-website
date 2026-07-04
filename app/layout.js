import './style.css';

export const metadata = {
  title: 'Biomedical Device Library',
  description: 'Arabic and English biomedical device knowledge base for biomedical engineering students.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
