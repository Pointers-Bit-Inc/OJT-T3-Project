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
        {/* Main Layout */}
        <div className="flex flex-1 flex-col">
          <Sidebar />
          <Header />
          {/* Content Section */}
          <main className="flex flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
