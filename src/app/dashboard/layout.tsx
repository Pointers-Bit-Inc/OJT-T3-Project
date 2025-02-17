import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import Sidebar from "~/components/jtechcomponents/sidebar";
import Header from "./Header";

export const metadata: Metadata = {
  title: "JTechShofy",
  description: "Generated",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

          {/* Content Area */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>

        {/* Mobile Sidebar Toggle (Optional) */}
        {/* You can use a button to toggle the sidebar on mobile devices if needed */}
      </body>
    </html>
  );
}
