import React, { useState, useRef, useEffect } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { Container, Row, Col } from 'reactstrap';
import Typed from 'react-typed';
import { useGetUser } from '@/actions/user';
import { useTranslation } from 'next-i18next'; 
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Snowflakes from '@/components/shared/Snowflakes'; 


const roles = ["Developer", "Python", "Django", "React JS", "NextJS"];
const Index = (_props) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { data, loading } = useGetUser();
  const flipInterval = useRef();
  const { t } = useTranslation('index'); // Использование useTranslation

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
      <Snowflakes /> 
      <BasePage indexPage title={t('pageTitle')}></BasePage>
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
                      <h2>{t('frontTitle')}</h2>
                      <div className="hero-section-content-intro">
                        {t('frontIntro')}
                      </div>

                    </div>
                    <img className="image" src="/images/section-3.jpg"/>
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                  <div className="back">
                    <div className="hero-section-content">
                      <h2>{t('backTitle')}</h2>
                      <div className="hero-section-content-intro">
                        {t('backIntro')}
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
                {t('welcomeMessage')}
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
                  {t('bioMessage')}
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
      'Header', 'common', 'index'
    ])),
  },
})

export default Index;