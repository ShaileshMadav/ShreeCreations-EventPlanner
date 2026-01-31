import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const images = [
  "/hero/image1.jpeg",
  "/hero/image2.jpeg",
  "/hero/image3.jpeg",
  "/hero/image4.jpeg",
  "/hero/image5.jpeg",
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-layout">
          {/* LEFT */}
          <div className="hero-left">
            <h1>
              Make Your Celebrations <span>Unforgettable</span>
            </h1>

            <p>
              Beautiful decorations for Baby Showers, Naming Ceremonies,
              Birthdays, Grand Openings, special occasions and more.
            </p>

            <Link to="/services" className="primary-btn">
              View Services
            </Link>
          </div>

          {/* RIGHT – IMAGE SLIDER */}
          <div className="hero-slider">
            <img src={images[current]} alt="Event decoration" />
          </div>
        </div>
      </section>

      {/* SERVICES INTRO */}
      <section className="services-intro container">
        <h2>Our Decoration Services</h2>

        <div className="services-grid">
          <div className="service-card">🎈 Baby Shower Decoration</div>
          <div className="service-card">👶 Naming Ceremony</div>
          <div className="service-card">🎂 Birthday Decoration</div>
          <div className="service-card">🏠 Opening Decor</div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <div className="container">
          <h2>Why Choose ShreeCreations?</h2>

          <ul>
            <li>✔ Creative & modern designs</li>
            <li>✔ Affordable pricing</li>
            <li>✔ On-time setup</li>
            <li>✔ Trusted local service</li>
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section">
        <div className="container cta-center">
          <h2>Ready to decorate your event?</h2>

          <p className="cta-label">Contact</p>

          <div className="cta-row">
            <a
              href="https://wa.me/918888888"
              target="_blank"
              rel="noreferrer"
              className="cta-whatsapp-link"
            >
              On WhatsApp
            </a>

            <span className="cta-separator">|</span>

            <div className="cta-info">
              <strong>Omkar Parab</strong>
              <div className="cta-sub">📞 +918552832375</div>
              <div>📍 Chakan, Pune</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
