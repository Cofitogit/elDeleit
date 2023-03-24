import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

function Lista() {
  const [tickets, setTickets] = useState([]);
  const [totalImporte, setTotalImporte] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  let nameId = '';

  useEffect(() => {
    switch (id) {
      case '0':
        nameId = 'Pueblo mio';
        break;
      case '1':
        nameId = 'Prado';
        break;
      case '2':
        nameId = 'Pulperia';
        break;
    }
    async function fetchTickets() {
      const response = await fetch('http://localhost:3000/api/tickets');
      const tickets = await response.json();
      const ticketsId = tickets.filter((ticket) => ticket.name === nameId);
      setTickets(ticketsId);
    }
    fetchTickets();
  }, []);

  const handleTotalImporteClick = () => {
    const importes = tickets.map((ticket) => ticket.importe);
    const total = importes.reduce((acc, curr) => acc + curr, 0);
    setTotalImporte(total);
  };

  return (
    <>
      <Layout>
        <div className='d-flex justify-content-center m-2'>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className='text-light'>Detalle</th>
                <th className='text-light'>Turno</th>
                <th className='text-light'>Fecha</th>
                <th className='text-light'>Importe</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className='text-light'>{ticket.detalle}</td>
                  <td className='text-light'>{ticket.turno}</td>
                  <td className='text-light'>{ticket.fecha}</td>
                  <td value={ticket.importe} className='text-light'>
                    ${ticket.importe}
                  </td>
                </tr>
              ))}
              {totalImporte !== null && (
                <tr>
                  <td colSpan='3' className='text-end text-light'>
                    Total:
                  </td>
                  <td className='text-light'>${totalImporte}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className='d-flex justify-content-center'>
          <button onClick={handleTotalImporteClick} className='btn btn-light mx-2'>
            Mostrar Total
          </button>
          <Link href={'/tickets'}>
            <button className='btn btn-danger mx-2'>
              VOLVER
            </button>
          </Link>
        </div>
      </Layout>
    </>
  );
}

export default Lista;
