import axios from 'axios';

function LimpiarTickets() {
    async function handleDel() {
        const res = await axios.delete('http://localhost:3000/api/tickets');
    }

  return (
    <div className='d-flex justify-content-center'>
      <button className='btn btn-danger mt-3' onClick={handleDel}>limpiar y guardar tickets</button>
    </div>
  );
}

export default LimpiarTickets;
