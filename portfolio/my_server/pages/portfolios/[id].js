import BaseLayout from '@/components/layouts/BaseLayout'; 

import BasePage from '@/components/BasePage'; 

import { useGetUser } from '@/actions/user'; 

import PortfolioApi from '@/lib/api/portfolios'; // Импорт API для работы с портфолио

const Portfolio = ({portfolio}) => {

  const { data: dataU, loading: loadingU } = useGetUser(); // Получение данных и статуса загрузки пользователя

  return (

    <BaseLayout user={dataU} loading={loadingU}> // Передача данных пользователя в лэйаут

      <BasePage header="Portfolio Detail"> // Отображение заголовка страницы

        {

          JSON.stringify(portfolio) // Вывод полученных данных портфолио

        }

      </BasePage>

    </BaseLayout>

  )

}



export async function getServerSideProps({query}) {

  const json = await new PortfolioApi().getById(query.id); // Запрос данных портфолио по id из query

  const portfolio = json.data; // Получение данных портфолио из ответа

  return {props: { portfolio }}; // Передача этих данных в качестве пропса

}



export default Portfolio; // Экспорт компонента страницы