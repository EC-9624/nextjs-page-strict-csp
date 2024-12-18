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
      ctx.res.setHeader('Content-Security-Policy', `script-src 'strict-dynamic' 'nonce-${nonce}' 'sha256-Qhdnrb+csbV1zMlKSzGiUeT5EiijiJocdIpAwk5NM3w=' http: https: 'unsafe-eval'; object-src 'none'; base-uri 'none';`)
    }
    //'sha256-KiHgyNjE+Yvsgma8XnEhjQedmhIoMy+kfKZ2z1V3BZk='

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
          <script>console.log(inline script)</script>
        </body>
      </Html>
    )
  }
}

export default MyDocument;
