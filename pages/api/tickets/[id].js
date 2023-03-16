export default function lista(req, res) {
  return res.status(200).json('obteniendo tickets del id: ' + req.query.id)
}
