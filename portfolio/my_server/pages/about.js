  import React, { useEffect } from 'react';
  import BaseLayout from '@/components/layouts/BaseLayout';
  import BasePage from '@/components/BasePage';
  import { useGetUser } from '@/actions/user';
  import { useTranslation } from 'next-i18next';
  import { Row, Col } from 'reactstrap';
  import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
  

  const About = (_props) => {
    const { data, loading } = useGetUser();
    const { t } = useTranslation('about');

    useEffect(() => {
      return () => {
        window.__isAboutLoaded = true;
      };
    }, []);

    const createFadeInClass = () => {
      if (typeof window !== 'undefined') {
        return window.__isAboutLoaded ? '' : 'fadein';
      }
      return 'fadein';
    };

    return (
      <BaseLayout user={data} loading={loading}>
        <BasePage title={t('title')} className="about-page">
          <Row className="mt-5">
            <Col md="6">
              <div className="left-side">
                <h1 className={`subtitle ${createFadeInClass()}`}>{t('subtitle')}</h1>
                <p className={`subsubTitle ${createFadeInClass()}`}>{t('description')}</p>
                <div>
                  <p>{t('checkProfiles')}</p>
                  <ul>
                    <li>
                      <a href="https://www.linkedin.com/in/keplerde" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/KeplerDE" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className={`${createFadeInClass()}`}>
                <p>{t('personalIntro')}</p>
              <p>{t('personalStory')}</p>
              </div>
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
};

export const getStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'Header', 'common', 'about'
    ])),
  },
})

export default About;
