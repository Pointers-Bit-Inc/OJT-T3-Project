"use client";

export function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 z-10">
      <div className="px-4 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-[11px] text-gray-500 gap-1.5 sm:gap-0">
          <div className="text-center sm:text-left pl-0 md:pl-64 lg:pl-0">
            2024 JTechShafey. All rights reserved.
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-right pr-4">
            <span>Version 1.0.0</span>
            <span className="hidden sm:inline text-[10px]">•</span>
            <span>Developed by Pointers Bit Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
