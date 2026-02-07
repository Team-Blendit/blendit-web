import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://blendit.kr'),
  title: "BlendIt",
  description: "IT 직군을 위한 네트워킹 플랫폼 BlendIt",
  openGraph: {
    title: "BlendIt",
    description: "IT 직군을 위한 네트워킹 플랫폼 BlendIt",
    images: ["/images/thumbnail.png"],
    type: "website",
    url: "https://blendit.kr",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlendIt",
    description: "IT 직군을 위한 네트워킹 플랫폼 BlendIt",
    images: ["/images/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
