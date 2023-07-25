import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
    return (
        <Html lang="en">
        <Head>
            <script
            src="https://kit.fontawesome.com/81ddc641e3.js"
            // crossorigin="anonymous"
            defer
            />
            <Link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
            />
            <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
            ></link>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossOrigin="anonymous"
            ></link>
            {/* <link
                rel="stylesheet"
                href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
            /> */}
            <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
            crossOrigin="anonymous"
            />
            <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4677645363383941"
            crossOrigin="anonymous"
            ></script>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
        </Html>
    );
}