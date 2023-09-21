  import BaseLayout from '@/components/layouts/BaseLayout';
  import BasePage from '@/components/BasePage';
  import { useGetUser } from '@/actions/user';
  import Masthead from 'components/shared/Masthead';
  import { Row, Col } from 'reactstrap';
  import BlogItem from 'components/BlogItem';
  import BlogApi from 'lib/api/blogs';

  const Blogs = ({blogs}) => {
    const { data, loading } = useGetUser();
    return (
      <BaseLayout
        navClass="transparent" className="blog-listing-page"
        user={data} loading={loading}>
        <Masthead imagePath="/images/home-bg_1.jpg">
          <h2>Ideas</h2>
          <span className="subheading">Programming, travelling, thinking...</span>
        </Masthead>
        <BasePage
          title="Newest Blogs - Denis Osipov"
          className="blog-body">
          <Row>
            {
              blogs.map(blog =>
                <Col key={blog._id} md="10" lg="8" className="mx-auto">
                  <BlogItem blog={blog}/>
                  <hr></hr>
                </Col>
              )
            }
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }

  // export async function getStaticProps() {
  //   const json = await new BlogApi().getAll();
  //   return {
  //     props: { blogs: json.data },
  //     revalidate: 60 // 
  //   };
  // }

  export async function getServerSideProps() {
    const { data } = await new BlogApi().getAll();  
    const blogs = data.map(item => ({...item.blog, author: item.author}))
    return {
      props: { blogs, revalidate: 10 }

    }
  }

  export default Blogs;