import About from './ui/About';
import Mission from './ui/Mission';
import Products from './ui/Products';
import Team from './ui/Team';
import Hero from './ui/Hero';
import Contact from './ui/Contact';

export function AboutPage() {
  return (
    <div className="">
      <Hero />
      <About />
      <Products />
      <Team/>
      <Mission />
      <Contact />
    </div>
  );
}
