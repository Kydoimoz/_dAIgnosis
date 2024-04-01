import { React } from "react";
import classes from "./Cookies.module.css";
export default function Cookies() {
    const [cookies, setCookie] = useCookies(['cookieConsent']);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasGivenConsent = cookies.cookieConsent;
        if (!hasGivenConsent) {
            setIsVisible(true);
        }
    }, [cookies]);

    const handleAccept = () => {
        setCookie('cookieConsent', true, { secure: true, maxAge: 30 * 24 * 60 * 60 });
        setIsVisible(false);
    };
    return isVisible ? (
        <div className={classes.consent_banner}>
            <div className={classes.consent_content}>
                <div className={classes.consent_banner_header}>dAIgnosis uses cookies to enhance user experience.</div>
                <div className={classes.consent_banner_description}>
                    We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services. You consent to our cookies if you continue to use our website.
                </div>
            </div>
            <div className={classes.consent_banner_actions}>
                <a href="#" class="cookie-consent-banner__cta">
                    OK
                </a>

                <a href="#" class="cookie-consent-banner__cta cookie-consent-banner__cta--secondary">
                    Decline
                </a>
            </div>
        </div>
    ) : null
}