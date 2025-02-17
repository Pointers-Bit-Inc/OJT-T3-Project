import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "./Header"; 

export const metadata: Metadata = {
  title: "JTechShofy",
  description: "Generated ",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Header /> 
        <main>{children}</main> 
      </body>
    </html>
  );
}
