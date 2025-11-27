
import "./contact.css";


interface ContactMethod {
    icon: string;
    label: string;
    href: string;
}

const ContactWindow = () => {


    const contactMethods: ContactMethod[] = [
        { icon: '📧', label: 'nkemme54@gmail.com', href: 'mailto:nkemme54@gmail.com' },
        { icon: '💻', label: 'github.com/trackerjo', href: 'https://github.com/TrackerJo' },
        { icon: '🔗', label: 'linkedin.com/in/nathanielkn   ', href: 'https://www.linkedin.com/in/nkemmenash/' }
    ];

    return (
        <>


            <div className="section-title">:: Get In Touch</div>
            <div className="contact-methods">
                {contactMethods.map((method, index) => (
                    <div key={index} className="contact-method" onClick={() => window.open(method.href, '_blank')}>
                        <span>{method.icon}</span>
                        <label>{method.label}</label>
                    </div>
                ))}
            </div>
            <br />


        </>
    );
}

export default ContactWindow;