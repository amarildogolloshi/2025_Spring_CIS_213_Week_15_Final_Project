import PublicLayout from "../../components/public/PublicLayout";
import styles from './PrivacyPolicy.module.css'

function PrivacyPolicy() {
    return (
        <PublicLayout>
            <div className={styles.container}>
                <h1>Privacy Policy</h1>
                <p><strong>Effective Date:</strong> 04/19/2025</p>
                <p>Welcome to Pulse! We value your privacy and strive to protect your personal information. This policy outlines how we collect, use, and safeguard your data.</p>

                <h2>1. Information We Collect</h2>
                <ul>
                    <li>**Personal Data**: Name, email, and other details you provide.</li>
                    <li>**Usage Data**: Interaction patterns, analytics, and session details.</li>
                    <li>**Technical Data**: Browser version, IP address, and device details.</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>Your data helps us improve our services, ensure security, and respond to inquiries.</p>

                <h2>3. Data Protection</h2>
                <p>We employ **strong encryption** and security protocols to protect your information.</p>

                <h2>4. Third-Party Services</h2>
                <p>Pulse may integrate external tools for analytics and authentication.</p>

                <h2>5. Your Rights</h2>
                <p>You can request **data access, modification, or deletion** at any time.</p>

                <h2>6. Contact Us</h2>
                <p className="contact">For questions, reach us at 📧 [contact@pulse.com]</p>
            </div>
        </PublicLayout>
    );
}

export default PrivacyPolicy;