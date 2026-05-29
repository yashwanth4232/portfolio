import type { Metadata } from "next";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Yashwanth Kumar Portfolio",
  description: "AI / ML Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}