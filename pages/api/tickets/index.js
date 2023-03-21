import { connectToDatabase } from '../../../config/db';

async function handler(req, res) {
  const connection = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      const [tickets] = await connection.query('SELECT * FROM ticket')
      connection.end();
      return res.status(200).json(tickets);
    case 'DELETE':
      const [deleteT] = await connection.query('DELETE FROM ticket WHERE 1')
      connection.end();
      return res.status(200).json('productos eliminados')
    case 'POST':
      const { name, importe, detalle, turno, fecha } = req.body;

      const [result] = await connection.query('INSERT INTO ticket SET ?', {
        name,
        importe,
        detalle,
        turno,
        fecha
      });
      connection.end();
      return res
        .status(200)
        .json({ name, importe, detalle, turno, id: result.insertId });
  }
}

export default handler;
