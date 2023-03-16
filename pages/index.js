import Layout from "../components/Layout";
import Sucursales from "../components/Sucursales";
import Tickets from "../components/Tickets";

export default function index() {
  return (
    <>
        <Layout>
          <Sucursales />
          <Tickets />
        </Layout>
    </>
  )
}

