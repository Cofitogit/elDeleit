import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function Lista() {
  const [tickets, setTickets] = useState([]);
  const [totalImporte, setTotalImporte] = useState(null);

  useEffect(() => {
    async function fetchTickets() {
      const response = await fetch('http://localhost:3000/api/tickets');
      const tickets = await response.json();
      setTickets(tickets);
    }
    fetchTickets();
  }, []);

  const handleTotalImporteClick = () => {
    const importes = tickets.map((ticket) => ticket.importe);
    const total = importes.reduce((acc, curr) => acc + curr, 0);
    setTotalImporte(total);
  };

  async function limpiar() {
    const res = await axios.delete('http://localhost:3000/api/tickets');
  }

  return (
    <>
      <Table striped bordered hover responsive className=''>
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
      <div className='d-flex justify-content-around'>
        <button onClick={handleTotalImporteClick} className='btn btn-light'>
          Mostrar Total
        </button>
        <Link href={'/'}>
          <button className='btn btn-danger' onClick={limpiar}>
            LIMPIAR
          </button>
        </Link>
      </div>
    </>
  );
}

export default Lista;
