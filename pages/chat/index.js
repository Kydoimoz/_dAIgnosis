import Chat from "@/components/pages/chat/ChatAI";
import classes from "../../styles/ChatPage.module.css";
import Layout from "@/components/Layout";
export default function ChatPage() {
    return (
        <Layout showFooter={false}>
            <div className={classes.container}>
                <Chat />
            </div>
        </Layout>
    )
}