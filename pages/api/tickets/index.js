import { connectToDatabase } from '../../../config/db';

async function handler(req, res) {
  const connection = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      const [tickets] = await connection.query('SELECT * FROM ticket');
      connection.end();
      return res.status(200).json(tickets);

    case 'DELETE':
      const fechaActual = new Date();
      const minutes = fechaActual.getMinutes();
      const seconds = fechaActual.getSeconds();
      const dia = fechaActual.getDate();
      const fechaFinal = Number(`${minutes}${seconds}${dia}00`);
      const [moveTicket] = await connection.query(
        'INSERT INTO ticketsave SELECT * FROM ticket'
      );
      const [lastTicket] = await connection.query(
        'INSERT INTO ticketsave SET ?',
        {
          name: 'ULTIMO TICKET',
          id: fechaFinal,
          detalle: '',
        }
      );
      const [deleteTicket] = await connection.query('DELETE FROM ticket');
      await connection.end();
      return res.status(200).json('terminado');

    case 'POST':
      const { name, importe, detalle, turno, fecha } = req.body;

      const [result] = await connection.query('INSERT INTO ticket SET ?', {
        name,
        importe,
        detalle,
        turno,
        fecha,
      });
      connection.end();
      return res
        .status(200)
        .json({ name, importe, detalle, turno, id: result.insertId });
  }
}

export default handler;
