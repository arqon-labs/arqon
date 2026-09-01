import { audit } from "@/content/audit";
import type { ReactNode } from "react";

export default function AuditLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(audit.lang)};`,
        }}
      />
      {children}
    </>
  );
}
