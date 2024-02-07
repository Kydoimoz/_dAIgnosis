import Footer from './pages/Footer';
import Header from './pages/Header';
import classes from './Layout.module.css'
function Layout({ children }) {
    return (
        <div className={classes.container}>
            <Header />
            <main className={classes.main}>
                {children}
            </main>
            <footer className={classes.footer}>
                <Footer />
            </footer>
        </div>
    );
}
export default Layout;