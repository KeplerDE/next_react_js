  import BaseLayout from '@/components/layouts/BaseLayout';
  import BasePage from '@/components/BasePage';
  import { useGetUser } from '@/actions/user';
  import Masthead from 'components/shared/Masthead';
  import { Row, Col } from 'reactstrap';
  import BlogItem from 'components/BlogItem';
  import BlogApi from 'lib/api/blogs';
  import { useRouter } from 'next/router';


  const Blogs = ({ blogs, totalPages, currentPage }) => {
    const { data, loading } = useGetUser();
    const router = useRouter();
  
    const handlePreviousPage = () => {
      // Calculate the next page number
      const nextPage = currentPage - 1;
  
      // Use the router to navigate to the next page
      router.push(`/blogs/?page=${nextPage}`)
    };
  
    const handleNextPage = () => {
      // Calculate the next page number
      const nextPage = currentPage + 1;
  
      // Use the router to navigate to the next page
      router.push(`/blogs/?page=${nextPage}`)
    };
  
    
    return (
      <BaseLayout
        navClass="transparent"
        className="blog-listing-page"
        user={data}
        loading={loading}
      >
        <Masthead imagePath="/images/home-bg_1.jpg">
          <h2>Ideas</h2>
          <span className="subheading">Programming, travelling, thinking...</span>
        </Masthead>
        <BasePage title="Newest Blogs - Denis Osipov" className="blog-body">
          <Row>
            {blogs.map(blog => (
              <Col key={blog._id} md="10" lg="8" className="mx-auto">
                <BlogItem blog={blog} />
                <hr />
              </Col>
            ))}
          </Row>
          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </BasePage>
      </BaseLayout>
    );
  };
  
  // export async function getStaticProps() {
  //   const json = await new BlogApi().getAll();
  //   return {
  //     props: { blogs: json.data },
  //     revalidate: 60 // 
  //   };
  // }

  export async function getServerSideProps({ query }) {
    const page = query?.page || 1; // Get the page parameter from the route or default to page 1
    console.log('Page parameter:', query ); // Add this line for debugging
    
    const { data } = await new BlogApi().getAll(page);
    const blogs = data.blogs.map(item => ({...item.blog, author: item.author}))
    const totalPages = data.totalPages
    const currentPage = data.currentPage
    return {
      props: { blogs, revalidate: 1, totalPages, currentPage }

    }
  }

  export default Blogs;