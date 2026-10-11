function Contact() {
  return (
    <div className="main-container">
      <section className="header-section">
        <div className="logo-container">
          <span className="logo-icon">✉️</span>
          <h1 className="logo-text">Contact Us</h1>
        </div>
        <p className="subtitle">
          Have questions? Reach out and we'll help you choose the best learning
          path.
        </p>
      </section>

      <section className="stats-section contact-section">
        <div className="contact-grid">
          <div className="contact-card">
            <h2>Email Support</h2>
            <p>support@bskcoding.com</p>
          </div>
          <div className="contact-card">
            <h2>Location</h2>
            <p>Virtual — based in Kuppam, Chittoor, Andhra Pradesh</p>
          </div>
          {/* Third card — reuses the existing .contact-card:nth-child(3)
              accent (green) that was already in App.css and unused. */}
          <div className="contact-card">
            <h2>LinkedIn</h2>
            <p>
              <a
                href="https://www.linkedin.com/company/bsk-coding/"
                target="_blank"
                rel="noopener noreferrer"
              >
                BSK Coding
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
