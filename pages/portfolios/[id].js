import BaseLayout from "../../components/layouts/BaseLayout";
import BasePage from "../../components/BasePage";


const Portfolio = ({portfolio}) => {

  return (
    <BaseLayout>
      <BasePage>
        <h1>I am Portfolio Page</h1>
        <h1>{portfolio.title}</h1>
        <p>BODY: {portfolio.body}</p>
        <p>ID: {portfolio.id}</p>
      </BasePage>
    </BaseLayout>
  )
}

export default Portfolio;