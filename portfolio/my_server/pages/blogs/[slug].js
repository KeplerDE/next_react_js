import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { Row, Col } from 'reactstrap';
import { useGetUser } from '@/actions/user';
import { SlateView } from 'slate-simple-editor';

import BlogApi from 'lib/api/blogs';

const BlogDetail = ({blog}) => {
  debugger
  const { data, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage
        title={`${blog.title} - Denis Osipov`}
        className="slate-container">
        <Row>
          <Col md={{size: 8, offset: 2}}>
            <SlateView initialContent={blog.content}/>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

export async function getStaticPaths() {
  const json = await new BlogApi().getAll();
  const blogs = json.data;
  const paths = blogs
    .filter(b => b?.slug)
    .map((blog) => ({params: { slug: blog.slug}}));
  return { paths, fallback: false};
}
 
export async function getStaticProps({params}) {
  const { data } = await new BlogApi().getBySlug(params.slug);
  return {props: {blog: data}}
}


export default BlogDetail;