import axios from 'axios';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetUser } from '@/actions/user';
import News from '@/components/news/News';

const Checkbox = ({ newsData }) => {
  const { data, loading } = useGetUser();

  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage title="Filtered News">
        <News />
      </BasePage>
    </BaseLayout>
  );
}

export default Checkbox;
