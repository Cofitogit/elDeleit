import { pool } from '../../../config/db';

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const [tickets] = await pool.query('SELECT * FROM ticket')
      return res.status(200).json(tickets);
    case 'DELETE':
      const [deleteT] = await pool.query('DELETE FROM ticket WHERE 1')
      return res.status(200).json('productos eliminados')
    case 'POST':
      const { name, importe, detalle, turno, fecha } = req.body;

      const [result] = await pool.query('INSERT INTO ticket SET ?', {
        name,
        importe,
        detalle,
        turno,
        fecha
      });
      return res
        .status(200)
        .json({ name, importe, detalle, turno, id: result.insertId });
  }
}

export default handler;
