import Header from './components/Header';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#paquetes">
        Saltar a los paquetes
      </a>
      <Header />
      <main>
        <Hero />
        <Packages />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
