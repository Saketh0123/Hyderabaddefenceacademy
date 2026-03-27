import React, { useEffect, useState } from "react";
import { assetUrl } from "../data/assetUrl";

export function PopupPromo() {
  const [open, setOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    // Modern browsers support addEventListener on MediaQueryList, older use addListener
    if (mq.addEventListener) mq.addEventListener("change", handle as any);
    else mq.addListener(handle as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handle as any);
      else mq.removeListener(handle as any);
    };
  }, []);

  useEffect(() => {
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;

    // Show popup after 1.5s
    openTimer = setTimeout(() => {
      setOpen(true);
      // After popup appears, show close button after 5s
      closeTimer = setTimeout(() => setShowClose(true), 5000);
    }, 1500);

    return () => {
      if (openTimer) clearTimeout(openTimer);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, []);

  if (!open) return null;

  const desktopPath = encodeURI("/hero-images/WED POSTER 1.jpg.jpg");
  const mobilePath = encodeURI("/hero-images/WED POSTER MOBILE.jpg.jpg");
  const src = assetUrl(isMobile ? mobilePath : desktopPath);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-[900px] md:max-w-3xl rounded shadow-lg max-h-[90vh] md:max-h-[80vh] overflow-hidden">
        <img src={src} alt="Promo" className="w-full h-full object-contain block bg-white" />
        {showClose && (
          <button
            onClick={() => setOpen(false)}
            aria-label="Close popup"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white w-10 h-10 flex items-center justify-center rounded-full border border-red-600 shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="block"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default PopupPromo;
