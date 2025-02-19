import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import Sidebar from "~/components/jtechcomponents/sidebar";
import Header from "./Header";
import { Footer } from "~/components/jtechcomponents/Footer";

export const metadata: Metadata = {
  title: "JTechShafey",
  description: "Inventory Management System",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex h-screen bg-gray-100">
        {/* Sidebar Section */}
        <div className="hidden w-64 flex-none lg:block">
          <Sidebar />
        </div>

        {/* Main Content Section */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <Header />

          {/* Main Content with padding for header */}
          <main className="flex-1 overflow-auto p-6 pb-20 mt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
