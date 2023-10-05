import Link from 'next/link';
import moment from 'moment';

const BlogItem = ({ blog }) => {
  // Extract the first 100 characters of the subtitle
  const truncatedSubtitle = blog.subTitle.length > 100
    ? blog.subTitle.substring(0, 100) + '...' // Add ellipsis if subtitle is longer than 100 characters
    : blog.subTitle;

  return (
    <div>
      <div className="post-preview clickable">
        <Link href="/blogs/[slug]" as={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="post-title">{blog.title}</h2>
            <h3 className="post-subtitle">{truncatedSubtitle}</h3>
          </a>
        </Link>
        <p className="post-meta">
          Posted by <a href="#">{blog.author.name}</a> - {moment(blog.createdAt).format('LLLL')}
        </p>
      </div>
    </div>
  );
};

export default BlogItem;
