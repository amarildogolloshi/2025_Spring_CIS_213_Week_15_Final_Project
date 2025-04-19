import PublicLayout from "../../components/public/PublicLayout";
import styles from './TermsAndConditions.module.css'

function TermsAndConditions() {
    return (
        <PublicLayout>
               <div className={styles.container}>
                    <h1>Terms and Conditions</h1>
                    <p><strong>Effective Date:</strong> [Insert Date]</p>
                    <p>By using **Pulse**, you agree to the following terms. If you do not agree, please discontinue use of the service.</p>

                    <h2>1. Use of the Platform</h2>
                    <ul>
                        <li>Provide accurate information when signing up.</li>
                        <li>Respect community guidelines and avoid harmful content.</li>
                        <li>Do not engage in unauthorized access or data tampering.</li>
                    </ul>

                    <h2>2. Account Management</h2>
                    <p>Users are responsible for keeping login credentials secure and reporting security breaches.</p>

                    <h2>3. Privacy & Data Usage</h2>
                    <p>Pulse collects and stores user information as outlined in our <strong>Privacy Policy</strong>.</p>

                    <h2>4. Intellectual Property</h2>
                    <p>All content, branding, and trademarks on Pulse belong to **Pulse or its licensors**. Unauthorized use or reproduction is prohibited.</p>

                    <h2>5. Limitation of Liability</h2>
                    <p>Pulse is not responsible for service interruptions, third-party services, or damages resulting from use.</p>

                    <h2>6. Modification of Terms</h2>
                    <p>Pulse reserves the right to update these terms. Continued use implies agreement with the latest version.</p>

                    <h2>7. Contact Information</h2>
                    <p class="contact">For questions, reach us at 📧 [contact@pulse.com]</p>
                </div>
        </PublicLayout>
    );
}

export default TermsAndConditions;