import { useState, useRef, useEffect } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { Container, Row, Col } from 'reactstrap';
import Typed from 'react-typed';
import { useGetUser } from '@/actions/user';


import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const roles = ["Developer", "Python", "Django", "React JS", "NextJS"];
const Index = (_props) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { data, loading } = useGetUser();
  const flipInterval = useRef();

  useEffect(() => {
    startAnimation();
    return () => flipInterval.current && clearInterval(flipInterval.current)
  }, []);

  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping(prevFlipping => !prevFlipping);
    }, 20000);
  }

  return (
    <BaseLayout
      user={data}
      loading={loading}
      navClass="transparent"
      className={`cover ${isFlipping ? 'cover-orange' : 'cover-blue'}`}>
      <BasePage indexPage title="Portfolio - Denis Osipov"></BasePage>
      <div className="main-section">
        <div className="background-image">
          <img src="/images/background-index.png" />
        </div>
        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                  <div className="front">
                    <div className="hero-section-content">
                      <h2> Full Stack </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>

                    </div>
                    <img className="image" src="/images/section-3.jpg"/>
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                  <div className="back">
                    <div className="hero-section-content">
                      <h2>Web Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img className="image" src="/images/section-7.jpg"/>
                    <div className="shadow-custom shadow-custom-orange">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h1>
                👋 ! I'm Denis, a passionate junior developer with a hunger for learning and creating. 🚀

                Welcome to my portfolio, where I showcase my journey into the world of coding...
                </h1>
              </div>
              <Typed
                loop  
                typeSpeed={70}
                backSpeed={70}
                strings={roles}
                backDelay={1000}
                loopCount={0}
                showCursor
                className="self-typed"
                cursorChar="|"
              />
              <div className="hero-welcome-bio">
                <h1>
                  Let's take a look on my work and ideas...
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BaseLayout>
  )
}

export const getStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'Header', 'common'
    ])),
  },
})

export default Index;
