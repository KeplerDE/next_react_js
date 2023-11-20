// Checkbox.js
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
        <News newsData={newsData} />
      </BasePage>
    </BaseLayout>
  );
}

export async function getServerSideProps(context) {
  // URL вашего серверного маршрута
  const BASE_URL = "https://portfolio-keplerde-ccae479f4d02.herokuapp.com/api/v1/news_query"; // Измените на соответствующий URL

  // Получение параметров запроса из контекста
  const queryParams = context.query;
  console.log(queryParams)

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        ...queryParams, // Использование параметров из контекста
      },
    });
    return {
      props: { newsData: response.data },
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { props: { newsData: {} } };
  }
}

export default Checkbox;
