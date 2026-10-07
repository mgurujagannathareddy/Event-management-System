import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

const emptyForm = {
  fullName: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  eventCity: "",
  budget: "",
  message: "",
};

const InfoCard = ({ label, title, subtitle }) => (
  <div className="info-card p-3 d-flex align-items-start gap-3">
    <div className="icon-box flex-shrink-0"></div>
    <div>
      <p className="info-label mb-1">{label}</p>
      <p className="info-title mb-1">{title}</p>
      {subtitle && <p className="info-subtitle mb-0">{subtitle}</p>}
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post("/api/contact", formData);
      toast.success(response.data.message);
      setFormData(emptyForm);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <header className="hero-section position-relative overflow-hidden">
        <div className="hero-circle hero-circle-1"></div>
        <div className="hero-circle hero-circle-2"></div>

        <div className="container position-relative py-5" style={{ zIndex: 2 }}>

          <h1 className="hero-title">
            Get In <span className="text-gradient-pink">Touch</span>
          </h1>
          <p className="hero-subtitle col-lg-6">
            Ready to plan something extraordinary? Our team is here to listen,
            advise, and create. Reach out and let's start building something
            unforgettable together.
          </p>
        </div>
      </header>


      <main className="contact-body py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="form-card p-4 p-md-5">
                <h3 className="form-title fw-bold mb-1">Send Us a Message</h3>
                <p className="form-subtitle mb-4">
                  Fill in the form below and our event specialists will get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-custom">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        className="form-control custom-input"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-custom">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control custom-input"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label-custom">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control custom-input"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label-custom">Event Type *</label>
                      <select
                        name="eventType"
                        className="form-select custom-input"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select an event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="engagement">Engagement</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-custom">Event Date</label>
                      <input
                        type="date"
                        name="eventDate"
                        className="form-control custom-input"
                        value={formData.eventDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label-custom">Event City</label>
                      <input
                        type="text"
                        name="eventCity"
                        className="form-control custom-input"
                        placeholder="e.g. HYD, KURNOOL,BANGALORE"
                        value={formData.eventCity}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label-custom">Budget Range</label>
                      <select
                        name="budget"
                        className="form-select custom-input"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select your budget range</option>
                        <option value="under-1l">Under ₹1,00,000</option>
                        <option value="1l-5l">₹1,00,000 – ₹5,00,000</option>
                        <option value="5l-10l">₹5,00,000 – ₹10,00,000</option>
                        <option value="above-10l">Above ₹10,00,000</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label-custom">Tell Us About Your Event</label>
                      <textarea
                        name="message"
                        className="form-control custom-input"
                        rows="4"
                        placeholder="Share your event vision, theme, expected guest count, date preferences, or any special requirements..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-send w-100" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message →"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-3 h-100">
                <InfoCard
                  label="BANGALORE Office"
                  title="Yelahanka"
                  subtitle="Main Branch — Mon to Sat, 9AM – 7PM"
                />
                <InfoCard
                  label="Hyderabad Office"
                  title="Kukatpally Housing Board"
                  subtitle="Regional Office — Mon to Sat, 9AM – 7PM"
                />
                <InfoCard
                  label="Call Us Anytime"
                  title="+91-99321371823 / +917989805729"
                  subtitle="+91-9650932214 | 0120-4331453"
                />
                <InfoCard
                  label="Email Us"
                  title="codenowevent@gmail.com"
                  subtitle="codenow@outlook.com • director@codenowevents.com"
                />

                <div className="info-card p-3 d-flex align-items-start gap-3">
                  <div className="icon-box flex-shrink-0"></div>
                  <div>
                    <p className="info-label mb-1">Follow Us</p>
                    <p className="info-title mb-2">Social Media</p>
                    <div className="d-flex gap-2">
                      <span className="social-circle">f</span>
                      <span className="social-circle">𝕏</span>
                      <span className="social-circle"><a
  href="https://instagram.com/pavanreddy_annapureddy"
  target="_blank"
  rel="noopener noreferrer"
  className="social-circle"
  aria-label="Instagram"
>
  ig
</a></span>
                      <span className="social-circle"><a
  href="https://linkedin.com/in/punya-pavan-annapureddy"
  target="_blank"
  rel="noopener noreferrer"
  className="social-circle"
  aria-label="LinkedIn"
>
  in
</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="floating-buttons">
        <button
          className="float-btn whatsapp-btn"
          aria-label="Chat on WhatsApp"
          onClick={() =>
            window.open(
              "https://wa.me/919876543210?text=Hello%20I%20am%20interested%20in%20your%20event",
              "_blank"
            )
          }
        >
          💬
        </button>

        <button
          className="float-btn call-btn"
          aria-label="Call us"
          onClick={() => window.location.href = "tel:+917989805729"}
        >
          📞
        </button>
      </div>
      <div className="footer-strip"></div>
    </div>
  );
};

export default Contact;