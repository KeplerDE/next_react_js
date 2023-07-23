import BaseLayout from "../components/layouts/BaseLayout";
import { Container, Button } from "reactstrap";

const Home = () => {
  return (
    <BaseLayout>
      <h1>I am home page</h1>
      <Container>
        <Button color="danger">Danger</Button>
      </Container>
    </BaseLayout >
  )
}

export default Home;