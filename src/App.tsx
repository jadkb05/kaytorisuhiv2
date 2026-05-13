import { CartProvider, useCart } from "./cart/CartContext";
import { CartBar } from "./components/CartBar";
import { ContactSection } from "./components/ContactSection";
import { JsonLdRestaurant } from "./components/JsonLdRestaurant";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { MenuSection } from "./components/MenuSection";
import { MobileStickyBar } from "./components/MobileStickyBar";
import { ReviewsSection } from "./components/ReviewsSection";
import { SignatureDishes } from "./components/SignatureDishes";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { TrustStrip } from "./components/TrustStrip";

function AppShell() {
  const { itemCount } = useCart();

  return (
    <>
      <SiteHeader />
      <main
        id="contenu-principal"
        className={
          itemCount > 0
            ? "pb-44 max-md:pb-[11.5rem] sm:pb-36 md:pb-28"
            : "pb-20 lg:pb-0"
        }
      >
        <HeroSection />
        <TrustStrip />
        <SignatureDishes />
        <GallerySection />
        <ReviewsSection />
        <MenuSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <CartBar />
      <MobileStickyBar />
    </>
  );
}

export function App() {
  return (
    <CartProvider>
      <JsonLdRestaurant />
      <AppShell />
    </CartProvider>
  );
}
