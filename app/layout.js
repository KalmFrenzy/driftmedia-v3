import './globals.css'

export const metadata = {
  title: 'Drift Media — Creative Production Studio',
  description: 'Films, campaigns, events and visual content by Drift Media.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
