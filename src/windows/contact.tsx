import { socialLinks } from "../constants";
import "./contact.css";

const ContactWindow = () => {
  return (
    <>
      <div className="section-title">:: Get In Touch</div>
      <div className="contact-methods">
        {socialLinks.map((method, index) => (
          <div
            key={index}
            className="contact-method"
            onClick={() => window.open(method.href, "_blank")}
          >
            <span>{method.icon}</span>
            <label>{method.label}</label>
          </div>
        ))}
      </div>
      <br />
    </>
  );
};

export default ContactWindow;
