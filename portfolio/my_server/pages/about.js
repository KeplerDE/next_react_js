import { useEffect } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetUser } from '@/actions/user';
import { Row, Col } from 'reactstrap';

const About = () => {
  const { data, loading } = useGetUser();

  useEffect(() => {
    return () => {
      window.__isAboutLoaded = true;
    }
  })

  const createFadeInClass = () => {
    if (typeof window !== 'undefined') {
      return window.__isAboutLoaded ? '' : 'fadein';
    }

    return 'fadein';
  }


  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage
        title="About Me - Denis Osipov"
        className="about-page">
        <Row className="mt-5">
          <Col md="6">
            <div className="left-side">
              <h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
              <h4 className={`subtitle ${createFadeInClass()}`}>To About Page</h4>
              <p className={`subsubTitle ${createFadeInClass()}`}>Feel free to read short description about me.</p>
            </div>
          </Col>
          <Col md="6">
            <div className={`${createFadeInClass()}`}>
              <p>Hi there! My name is... </p>
              <p>
              🚀 Exciting News! 🚀

Hey everyone! I'm thrilled to share a major milestone in my journey. 🌟

I am now officially a Junior Full-Stack Web Developer! 🖥️🌐 After months of hard work, learning, and overcoming challenges, I've embarked on this new adventure in the tech world.

🔥 My enthusiasm for web development has been the driving force behind this achievement. Even though I'm just getting started, I'm eager to tackle new projects, learn from experienced developers, and contribute my skills to make a positive impact.

🚀 Joining the tech community has always been a dream of mine, and I couldn't be happier to take this exciting step forward. I want to express my gratitude to everyone who has supported me along the way – you know who you are! 🙌

I'm open to new opportunities and collaborations, so if you're in the tech industry and have any advice, projects, or opportunities to share, please don't hesitate to reach out. Let's connect and grow together! 🚀👩‍💻
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

export default About;