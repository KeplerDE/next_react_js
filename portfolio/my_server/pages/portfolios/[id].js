import BaseLayout from '@/components/layouts/BaseLayout'; 

import BasePage from '@/components/BasePage'; 

import { useGetUser } from '@/actions/user'; 

import PortfolioApi from '@/lib/api/portfolios'; // Импорт API для работы с портфолио

// Компонент страницы с данными портфолио
const Portfolio = ({portfolio}) => {

  // Получение данных пользователя
  const { data: dataU, loading: loadingU } = useGetUser();
  
  // Отрисовка компонентов с данными
  return (
    <BaseLayout user={dataU} loading={loadingU}>
      <BasePage header="Portfolio Detail">
        {JSON.stringify(portfolio)}
      </BasePage>
    </BaseLayout>
  )

}

// Функция для статической генерации путей во время билда 
export async function getStaticPaths() {

  // Получение всех портфолио
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;

  // Формирование массива путей на основе ID
  const paths = portfolios.map(portfolio => {
    return {
      params: {id: portfolio._id}
    }
  })

  // Возврат путей и опции fallback
  return { paths, fallback: false };
}

// Функция для получения данных портфолио во время билда
export async function getStaticProps({params}) {
  
  // Запрос данных портфолио по ID из параметров
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;

  // Возврат пропсов со страницей
  return { props: {portfolio}}; 
}

export default Portfolio;