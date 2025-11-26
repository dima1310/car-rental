import type { Metadata } from "next";
import "@/src/app/globals.css";
import { Header } from "@/src/components/layout/Header/Header";

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Car rental service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
