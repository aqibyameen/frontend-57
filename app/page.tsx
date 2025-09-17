import { Navigation } from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { ProductsSection } from "@/components/products-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <CategoriesSection />
      <main>
        <ProductsSection />
      </main>
      <TestimonialsSection />
      <Footer />
    </>
  )
}
