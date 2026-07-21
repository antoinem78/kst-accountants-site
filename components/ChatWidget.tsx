// SingularWeb AI chat widget (n8n chat, pinned version — an upstream release
// must never change this live page). The token is a deployment credential:
// public by necessity in page source, protected by the server-side origin
// allow-list and rotatable. British English throughout.
const WIDGET_SCRIPT = `
import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat@1.28.3/dist/chat.bundle.es.js';
createChat({
  webhookUrl: 'https://singularweb.app.n8n.cloud/webhook/agent-webchat-v1/chat',
  mode: 'window',
  loadPreviousSession: false,
  showWelcomeScreen: false,
  enableStreaming: false,
  metadata: { token: 'wct_1fykhk2NkJnuq-cgKz3jWSiioP3WktDC' },
  initialMessages: [
    "I am KST Accountants' virtual AI assistant. Ask about our services, switching accountant, or Making Tax Digital."
  ],
  i18n: {
    en: {
      title: 'KST Accountants',
      subtitle: 'Ask about our services or getting started.',
      inputPlaceholder: 'Type your question...',
      getStarted: 'New conversation',
      footer: ''
    }
  }
});
`;

export default function ChatWidget() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@n8n/chat@1.28.3/dist/style.css"
      />
      <script type="module" dangerouslySetInnerHTML={{ __html: WIDGET_SCRIPT }} />
    </>
  );
}
