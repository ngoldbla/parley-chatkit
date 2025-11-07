"use client";

import { useEffect, useState } from "react";

type IframeGuardProps = {
  children: React.ReactNode;
};

export function IframeGuard({ children }: IframeGuardProps) {
  const [isInIframe, setIsInIframe] = useState<boolean | null>(null);
  const [isSharePoint, setIsSharePoint] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if we're in an iframe
    const inIframe = window.self !== window.top;
    setIsInIframe(inIframe);

    if (inIframe) {
      try {
        // Try to access the parent's location to check if it's SharePoint
        const parentHostname = document.referrer;
        const isFromSharePoint =
          parentHostname.includes("sharepoint.com") ||
          parentHostname.includes("kennesawedu.sharepoint.com");
        setIsSharePoint(isFromSharePoint);
      } catch {
        // If we can't access parent due to cross-origin, check referrer
        const referrer = document.referrer;
        const isFromSharePoint =
          referrer.includes("sharepoint.com") ||
          referrer.includes("kennesawedu.sharepoint.com");
        setIsSharePoint(isFromSharePoint);
      }
    } else {
      setIsSharePoint(false);
    }
  }, []);

  // Show loading state while checking
  if (isInIframe === null || isSharePoint === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="text-center">
          <div className="mb-4 text-2xl">🔒</div>
          <p className="text-gray-600 dark:text-gray-400">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  // Show error if not in SharePoint iframe
  if (!isInIframe || !isSharePoint) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-slate-800">
          <div className="mb-4 text-4xl">🔒</div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Access Restricted
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            The Parley is only accessible through the KSU Office of Research
            SharePoint portal.
          </p>
          <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>For KSU Office of Research staff:</strong>
              <br />
              Please access this tool through the official SharePoint page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Allow access if in SharePoint iframe
  return <>{children}</>;
}
