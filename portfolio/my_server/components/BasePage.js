import { Container } from 'reactstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';


const PageHeader = ({header}) =>
  <div className="page-header">
    <h1 className="page-header-title">{header}</h1>
  </div>


const BasePage = props => {
  const router = useRouter();
  const {
    noWrapper,
    indexPage,
    className = '',
    header,
    title = "Portfolio - Denis Osipov",
    metaDescription="My name is Denis Osipov - Junior Developer on a mission to turn code into creative solutions. Learning, growing, and building one line at a time...",
    canonicalPath,
    children } = props;

  const pageType = indexPage ? 'index-page' : 'base-page';
  const Wrapper = noWrapper ? React.Fragment : Container;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" key="description" content={metaDescription} />
        <meta name="title" key="title" content={title} />
        <meta property="og:title" key="og:title" content={title} />
        <meta property="og:locale" key="og:locale" content="en_EU" />
        <meta property="og:url" key="og:url" content={`${process.env.BASE_URL}${router.asPath}`} />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:description" key="og:description" content={metaDescription} />
        <meta property="og:image" key="og:image" content={`${process.env.BASE_URL}/images/section-3.jpg`} />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        <link rel="icon" type="image/x-icon" href="/images/favicon-32x32.png"/>
        <link
          rel="canonical"
          href={`${process.env.BASE_URL}${canonicalPath ? canonicalPath : router.asPath}`} />
      </Head>
      <div className={`${pageType} ${className}`}>
      <Wrapper>
          { header && <PageHeader header={header} /> }
          {children}
        </Wrapper>
      </div>
    </>
  )
}

export default BasePage;