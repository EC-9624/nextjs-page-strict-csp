import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

interface MyDocumentProps extends DocumentInitialProps {
  nonce?: string;
}

class MyDocument extends Document<MyDocumentProps> {

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const nonce = createHash('sha256').update(uuidv4()).digest('base64')

    if (ctx.res) {
      ctx.res.setHeader('x-nonce', nonce);
      ctx.res.setHeader('Reporting-Endpoints', 'csp-endpoint="http://localhost:3002/csp-violation"')
      ctx.res.setHeader('Content-Security-Policy', `script-src 'strict-dynamic' 'nonce-${nonce}' 'unsafe-inline' http: https:; object-src 'none'; base-uri 'none'; `)
    } 3

    return { ...initialProps, nonce };
  }

  render() {
    const nonce = this.props.nonce;
    return (
      <Html lang="ja">
        <Head nonce={nonce} />
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    )
  }
}

export default MyDocument;