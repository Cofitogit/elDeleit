import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Detalle from '../../components/Detalle';
import Importe from '../../components/Importe';
import Layout from '../../components/Layout';
import { sucursal } from '../../data';
import { useBookStore } from '../../src/store/bookStore';

export default function suc() {
  const router = useRouter();
  const { id } = router.query;
  const [visibleD, setVisibleD] = useState(false);
  const [visibleI, setVisibleI] = useState(false);
  const [visibleF, setVisibleF] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');
  const [ticketIncomplete, setTicketIncomplete] = useState([]);
  const [ticketSave, setTicketSave] = useState(false);
  const [ticketUnsave, setTicketUnsave] = useState(false);
  const detalle = useBookStore((s) => s.finalD);
  const inputValor = useBookStore((s) => s.finalI)

  function onOff(e) {
    switch (e.target.value) {
      case 'detalle':
        setVisibleD(!visibleD);
        setVisibleF(false);
        setVisibleI(false);
        break;
        case 'importe':
          setVisibleI(!visibleI);
          setVisibleD(false);
          setVisibleF(false);
          break;
        case 'fecha':
          setVisibleF(!visibleF);
          setVisibleD(false);
          setVisibleI(false);
          break;
    }
  }

  const [fecha, setFecha] = useState('');
  const [dia, setDia] = useState(0);

  useEffect(() => {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1;
    const anioActual = fechaActual.getFullYear();
    setFecha(`${diaActual}/${mesActual}/${anioActual}`);
    setDia(diaActual);
  }, []);

  const subirDia = () => {
    const fechaActualizada = new Date();
    fechaActualizada.setDate(dia + 1);
    const diaNuevo = fechaActualizada.getDate();
    const mesNuevo = fechaActualizada.getMonth() + 1;
    const anioNuevo = fechaActualizada.getFullYear();
    setFecha(`${diaNuevo}/${mesNuevo}/${anioNuevo}`);
    setDia(diaNuevo);
  };

  const bajarDia = () => {
    const fechaActualizada = new Date();
    fechaActualizada.setDate(dia - 1);
    const diaNuevo = fechaActualizada.getDate();
    const mesNuevo = fechaActualizada.getMonth() + 1;
    const anioNuevo = fechaActualizada.getFullYear();
    setFecha(`${diaNuevo}/${mesNuevo}/${anioNuevo}`);
    setDia(diaNuevo);
  };

  function updateDetalle(detalleF) {
    return detalleF.map((item) => {
      if (item === "R") {
        return "+ rallado";
      } else if (item === "F") {
        return "+ facturas";
      } else if (item === "C") {
        return "+ criollos";
      }
      return item;
    });
  }

  async function enviarTicket() {
    let vacio = [];

    if (detalle[0] === '') {
      vacio.push('Rellenar la pestaña DETALLE');
    }

    if (selectedButton === '') {
      vacio.push('Seleccionar un turno');
    }

    if (inputValor === '$') {
      vacio.push('Rellenar la pestaña IMPORTE');
    }

    if (vacio.length > 0) {
      setTicketIncomplete(vacio);
      return setTicketUnsave(true);
    } else {
      let finalImp = Number(inputValor.slice(1, inputValor.length))
      const updatedDetalle = updateDetalle(detalle);
      const res = await axios.post('/api/tickets', {
        name: sucursal[id],
        importe: finalImp,
        turno: selectedButton,
        fecha: fecha,
        detalle: updatedDetalle.join(' ')
      })
      return setTicketSave(true);
    }
  }

  return (
    <Layout>
      <div className='mt-2'>
        <h2 className='text-center text-danger border-bottom border-danger pb-2'>
          {sucursal[id]}
        </h2>
      </div>
      <div className='card-body mt-2 d-flex justify-content-center'>
        <button
          className='btn btn-secondary rounded-0 rounded-start border-end border-dark'
          onClick={() => setSelectedButton('mañana')}
          style={{ opacity: selectedButton === 'mañana' ? 1 : 0.2 }}
        >
          Mañana
        </button>
        <button
          className='btn btn-secondary rounded-0 rounded-end border-start border-dark'
          onClick={() => setSelectedButton('tarde')}
          style={{ opacity: selectedButton === 'tarde' ? 1 : 0.2 }}
        >
          Tarde
        </button>
      </div>
      <div className='card-body bg-secondary d-flex justify-content-around mt-2'>
        <button className='btn btn-success rounded-0' value='detalle' onClick={onOff}>
          DETALLE
        </button>
        <button className='btn btn-success rounded-0' value='importe' onClick={onOff}>
          IMPORTE
        </button>
        <button className='btn btn-success rounded-0' value='fecha' onClick={onOff}>
          FECHA
        </button>
      </div>
      <div
        className='bg-dark mx-auto mt-2'
        style={{ height: '290px', width: '300px' }}
      >
        <Detalle visibleD={visibleD} />
        <Importe visibleI={visibleI} />
        <div
          className='display-absolute bg-dark border border-success'
          style={{
            width: '100%',
            display: visibleF ? 'block' : 'none',
          }}
        >
          <div className='card bg-dark'>
            <div className='card-body my-2'>
              <div className='input-group'>
                <input
                  type='text'
                  className='text-center w-50 fw-bold fs-4 bg-secondary text-light'
                  value={fecha}
                  readOnly
                />
                <div className='input-group-append'>
                  <button className='btn btn-success ms-4' onClick={subirDia}>
                    <h5 className='px-1'>+</h5>
                  </button>
                  <button className='btn btn-danger ms-2' onClick={bajarDia}>
                    <h5 className='px-1'>-</h5>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className='position-fixed'
            style={{
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: ticketUnsave ? 'block' : 'none',
              zIndex: 2,
              width: '100%',
            }}
          >
            <div
              className='card-body border border-danger rounded animacion-escalar'
              style={{ background: 'rgb(61, 0, 0)' }}
            >
              <h5 className='text-center text-light p-2 fw-lighter my-auto'>
                <ul className='mt-1'>
                  {ticketIncomplete.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </h5>
              <div className='d-flex justify-content-center mb-2'>
                <button
                  onClick={() => setTicketUnsave(false)}
                  className='btn btn-outline-danger'
                >
                  X
                </button>
              </div>
            </div>
          </div>
          <div
            className='position-absolute'
            style={{
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              zIndex: 2,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)',
              display: ticketSave ? 'block' : 'none',
            }}
          >
            <div
              className='card-body border border-success rounded animacion-escalar'
              style={{ margin: '60% 20px', background: 'rgb(0, 54, 5)' }}
            >
              <h3 className='text-center text-light p-2 fw-lighter'>
                TICKET GUARDADO
              </h3>
              <div className='d-flex justify-content-center'>
                <Link href={'/'} className='text-decoration-none'>
                  <button className='btn btn-success mb-2 text-light'>
                    nuevo ticket
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className='card-body bg-dark border-bottom border-top border-light rounded mx-3 mt-1'>
            <h3 className='text-light text-center ms-1 pt-2 fw-lighter'>
              Detalles del TICKET:
            </h3>
            <h3 className='text-light text-center ms-1'>
              {detalle.join(' ') +
                ' ' +
                inputValor +
                ' ' +
                fecha +
                ' ' +
                selectedButton}
            </h3>
          </div>
          <div className='d-flex justify-content-center my-2'>
            <button onClick={enviarTicket} className='btn btn-success'>
              GUARDAR
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
