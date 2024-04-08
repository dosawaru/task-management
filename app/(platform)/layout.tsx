import { ModalProvider } from "@/components/modal/card-modal/modal-provider";
import { QueryProvider } from "@/components/modal/card-modal/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-slate-100" suppressHydrationWarning>
        <QueryProvider>
          <Toaster />
          <ModalProvider />
          <body>{children}</body>
        </QueryProvider>
      </html>
    </ClerkProvider>
  );
}
