import React from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';

import { Container, Row, Col } from 'reactstrap';
import Typed from "react-typed";
import { useGetUser } from '@/actions/user';

const roles = ["Developer", "Python", "Django", "React JS", "NextJS"];
const Index = () => {

  const { data, loading } = useGetUser();
  debugger
  return (
    <BaseLayout
      user={data}
      loading={loading}
      navClass="transparent"
      className="cover">
        <div className="main-section">
          <div className="background-image">
            <img src="/images/background-index.png" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper`}>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img className="image" src="/images/section-1.jpg"/>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                  "Hi there! I'm Denis, a junior developer. My portfolio represents projects I've built while learning.
                   I'd appreciate your advice on improving my skills!"
                  </h1>
                </div>

                <div className="hero-welcome-bio">
                  <h1>
                    Let's take a look on my work.
                  </h1>
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
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    )
  }


export default Index;