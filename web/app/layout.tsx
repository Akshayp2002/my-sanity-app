import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { client, urlFor } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppBubble } from "@/components/WhatsAppBubble";
import { StickyMobileActionBar } from "@/components/StickyMobileActionBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_LAYOUT_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    showNotificationBar,
    topNotificationBar,
    logoImage,
    logoImageUrl,
    logoIcon,
    logoText,
    logoTagline,
    whatsappNumber,
    navItems[]{ label, link },
    footerAboutText,
    footerOfficeAddress,
    footerPhone,
    footerEmail,
    footerCopyright,
    metaTitle,
    metaDescription,
    metaKeywords,
    ogImage,
    canonicalUrl
  },
  "destinations": *[_type == "destination"] | order(order asc){
    name,
    link
  }
}`);

const options = { next: { revalidate: 60 } };

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<SanityDocument | null>(SITE_LAYOUT_QUERY, {}, options);
  const settings = data?.settings;

  const title =
    settings?.metaTitle ||
    `${settings?.logoText || "Kerala Green Haven Tours"} | Best Kerala Holiday Packages & Houseboat Cruises`;
  const description =
    settings?.metaDescription ||
    "Authorized local tour operator in Kerala, India. Customized holiday packages for Munnar, Alleppey Houseboats, Wayanad, Kovalam, and Ayurveda Retreats.";
  const keywords =
    settings?.metaKeywords ||
    "Kerala tour packages, Munnar tour, Alleppey houseboat, Kerala tourism, Kochi cab service";
  const canonical = settings?.canonicalUrl || "https://keralagreenhaventours.com";

  let ogImageUrl = "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200";
  if (settings?.ogImage) {
    try {
      ogImageUrl = urlFor(settings.ogImage).width(1200).height(630).url();
    } catch {
      // fallback
    }
  }

  return {
    title: {
      default: title,
      template: `%s | ${settings?.logoText || "Kerala Green Haven Tours"}`,
    },
    description,
    keywords: keywords.split(",").map((k: string) => k.trim()),
    authors: [{ name: settings?.logoText || "Kerala Green Haven Tours" }],
    creator: settings?.logoText || "Kerala Green Haven Tours",
    metadataBase: new URL(canonical),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings?.logoText || "Kerala Green Haven Tours",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await client.fetch<SanityDocument | null>(SITE_LAYOUT_QUERY, {}, options);
  const settings = data?.settings;

  // Toggle & content for top notification bar
  const showNotification =
    settings?.showNotificationBar !== false &&
    Boolean(settings?.topNotificationBar && settings.topNotificationBar.trim().length > 0);
  const topNotification = settings?.topNotificationBar || "";

  // Transparent PNG / SVG logo support
  const logoSrc = settings?.logoImage
    ? urlFor(settings.logoImage).url()
    : settings?.logoImageUrl || null;

  const logoIcon = settings?.logoIcon || "🌴";
  const logoText = settings?.logoText || "Kerala Green Haven Tours";
  const logoTagline = settings?.logoTagline || "Tours & Travels • Kochi, Kerala";

  const rawWhatsapp = settings?.whatsappNumber || "+919876543210";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");

  const navItems = settings?.navItems?.length
    ? settings.navItems
    : [
        { label: "Home", link: "/" },
        { label: "Kerala Packages", link: "/packages" },
        { label: "About Us", link: "/about" },
        { label: "Contact Us", link: "/contact" },
      ];

  const destinations = data?.destinations || [];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        {/* Universal Top Notification Bar */}
        {showNotification && (
          <div className="bg-emerald-900 text-emerald-100 text-[11px] sm:text-xs py-2 px-4 text-center font-medium leading-tight">
            {topNotification}
          </div>
        )}

        {/* Universal Header */}
        <Header
          logoSrc={logoSrc}
          logoIcon={logoIcon}
          logoText={logoText}
          logoTagline={logoTagline}
          navItems={navItems}
          whatsappNumber={cleanWhatsapp}
        />

        {/* Page Content */}
        <div className="flex-1">{children}</div>

        {/* Universal Footer */}
        <Footer
          logoSrc={logoSrc}
          logoIcon={logoIcon}
          logoText={logoText}
          footerAbout={settings?.footerAboutText}
          footerAddress={settings?.footerOfficeAddress}
          footerPhone={settings?.footerPhone}
          footerEmail={settings?.footerEmail}
          footerCopyright={settings?.footerCopyright}
          whatsappNumber={cleanWhatsapp}
          destinations={destinations}
        />

        {/* Global Floating WhatsApp Bubble (Desktop / Tablet) */}
        <div className="hidden md:block">
          <WhatsAppBubble
            phone={cleanWhatsapp}
            message="Hello! I am interested in Kerala tour packages and custom itineraries."
          />
        </div>

        {/* Sticky Mobile Quick-Action Bar (Mobile devices) */}
        <StickyMobileActionBar
          whatsappNumber={cleanWhatsapp}
          phoneNumber={settings?.footerPhone || "+919876543210"}
        />
      </body>
    </html>
  );
}
