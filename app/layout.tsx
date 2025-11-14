import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "./components/analytics";
import EmbedmeWidget from "./components/embedmewidget";

export const metadata: Metadata = {
  title: {
    default: "aayushpagare.com",
    template: "%s | aayushpagare.com",
  },
  description: "Software Engineer, Technical Writer, Freelancer",
  openGraph: {
    title: "aayushpagare.com",
    description: "Software Engineer, Technical Writer, Freelancer",
    url: "https://www.aayushpagare.com",
    siteName: "aayushpagare.com",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />

        {/* === 1. Anti-flicker overlay script === */}
        <Script id="optimeleon-anti-flicker" strategy="beforeInteractive">
          {`
            !(function (h, i, e) {
              var t = 2000;
              var n = h.createElement("style");
              n.id = e;
              n.innerHTML = "body{opacity:0}";
              h.head.appendChild(n);
              i.rmfk = function () {
                var t = h.getElementById(e);
                t && t.parentNode.removeChild(t);
              };
              setTimeout(i.rmfk, t);
            })(document, window, "optimeleon-overlay");
          `}
        </Script>

        {/* === 2. setOptiCookieConsent helper === */}
        <Script id="optimeleon-cookie-consent" strategy="beforeInteractive">
          {`
            window.setOptiCookieConsent = function(consent) {
              localStorage.setItem("opti_consent", consent);
            };
          `}
        </Script>

        {/* === 3. Async external script === */}
        <Script
          id="optimeleon-external"
          src="https://cdn-stag.optimeleon.com/aay-z4o6w/aay-z4o72/v1.main.js"
          async
          strategy="afterInteractive"
        />

        {/* === 4. optimeleon init loader snippet === */}
        <Script id="optimeleon-init" strategy="afterInteractive">
          {`
            !function(e,t,o,n,a,c,l){
              e.optimeleon||(a=e.optimeleon=function(){
                a.callMethod ? a.callMethod.apply(a,arguments) : a.queue.push(arguments)
              },
              a.push=a,
              a.queue=[],
              (c=t.createElement(o)).async=!0,
              c.src="https://cdn-stag.optimeleon.com/aay-z4o6w/aay-z4o72/v1.main.js",
              (l=t.getElementsByTagName(o)[0]).parentNode.insertBefore(c,l))
            }(window,document,"script");

            optimeleon("init", true, true);
          `}
        </Script>
      </head>

      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        {children}
        <EmbedmeWidget />
      </body>
    </html>
  );
}
