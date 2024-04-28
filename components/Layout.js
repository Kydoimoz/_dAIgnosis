import Footer from './pages/Footer';
import Header from './pages/Header';
import classes from './Layout.module.css';
import { useRouter } from 'next/router';

function Layout({ children, showFooter = true }) {
    const router = useRouter();
    const hideHeaderFooterRoutes = ["/signup", "/chat", "/login"];

    const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(router.pathname);

    return (
        <div className={classes.container}>
            {!shouldHideHeaderFooter && <Header />}
            <main className={classes.main}>
                {children}
            </main>
            {!shouldHideHeaderFooter && showFooter && (
                <footer className={classes.footer}>
                    <Footer />
                </footer>
            )}
        </div>
    );
}

export default Layout;