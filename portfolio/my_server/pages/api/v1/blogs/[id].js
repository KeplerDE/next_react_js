import BlogApi from '@/lib/api/blogs';


export default async function handleBlog(req, res) {
  if (req.method === 'GET') {
    const json = await new BlogApi().getById(req.query.id);
    return res.json(json.data);
  }
}