import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { sucursal } from '../../data';

export default function suc() {
  const router = useRouter();
  const { id } = router.query;
  const [visibleD, setVisibleD] = useState(false);
  const [visibleI, setVisibleI] = useState(false);
  const [visibleF, setVisibleF] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');
  const [vPan, setvPan] = useState('');
  const [detalle, setDetalle] = useState(['', 'Kg de pan']);
  const [inputValor, setInputValor] = useState('$');

  let pantalla = false;

  if (detalle[0] !== '') {
    pantalla = true;
  }

  function handleD(e) {
    e.preventDefault();
    setVisibleD(!visibleD);
    setVisibleF(false);
    setVisibleI(false);
  }

  function handleF(e) {
    e.preventDefault();
    setVisibleF(!visibleF);
    setVisibleD(false);
    setVisibleI(false);
  }

  function handleI(e) {
    e.preventDefault();
    setVisibleI(!visibleI);
    setVisibleD(false);
    setVisibleF(false);
  }

  function agregarValor(e) {
    e.preventDefault();
    if (detalle[0].length > 1) {
      return;
    }
    const copiaDetalle = [...detalle];
    copiaDetalle[0] = copiaDetalle[0] + e.target.value;
    setDetalle(copiaDetalle);
    setvPan(copiaDetalle.join(' '));
  }

  function agregarValorExtra(e) {
    e.preventDefault();
    if (detalle.find((c) => c === e.target.value)) {
      return;
    }
    const copiaDetalle = [...detalle];
    copiaDetalle.push(e.target.value);
    setDetalle(copiaDetalle);
    setvPan(copiaDetalle.join(' '));
  }

  function del(e) {
    e.preventDefault();
    setDetalle(['', 'Kg de pan']);
  }

  function delI(e) {
    e.preventDefault();
    setInputValor('$');
  }

  function agregarValorI(e) {
    setInputValor(inputValor + e.target.value);
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
        <button className='btn btn-success rounded-0' onClick={handleD}>
          DETALLE
        </button>
        <button className='btn btn-success rounded-0' onClick={handleI}>
          IMPORTE
        </button>
        <button className='btn btn-success rounded-0' onClick={handleF}>
          FECHA
        </button>
      </div>
      <div
        className='bg-dark mx-auto mt-2 border border-success border-2'
        style={{ height: '290px', width: '300px' }}
      >
        <div
          className='display-absolute bg-success'
          style={{
            height: '100%',
            width: '100%',
            display: visibleD ? 'block' : 'none',
          }}
        >
          <div
            className='card-body w-100 bg-dark d-flex justify-content-between'
            style={{ height: '45px' }}
          >
            <h5 className='text-light ms-1 pt-2 fw-lighter'>
              {pantalla ? vPan : ''}
            </h5>
            <button onClick={del} className='btn btn-dark my-1'>
              <i className='bi bi-arrow-left'></i>
            </button>
          </div>
          <div className='container'>
            <div className='row mt-1'>
              <div className='bg-success d-grid justify-content-center w-25'>
                <button
                  onClick={agregarValor}
                  value='1'
                  className='btn btn-dark rounded m-1'
                >
                  1
                </button>
                <button
                  onClick={agregarValor}
                  value='2'
                  className='btn btn-dark rounded m-1'
                >
                  2
                </button>
                <button
                  onClick={agregarValor}
                  value='3'
                  className='btn btn-dark rounded m-1'
                >
                  3
                </button>
                <button
                  onClick={agregarValor}
                  value='4'
                  className='btn btn-dark rounded m-1'
                >
                  4
                </button>
                <button
                  onClick={agregarValor}
                  value='5'
                  className='btn btn-dark rounded m-1'
                >
                  5
                </button>
              </div>
              <div className='bg-dark w-50 d-grid'>
                <button
                  value='R'
                  onClick={agregarValorExtra}
                  className='btn btn-sm btn-success mt-1'
                >
                  R
                </button>
                <button
                  value='C'
                  onClick={agregarValorExtra}
                  className='btn btn-sm btn-success my-2'
                >
                  C
                </button>
                <button
                  value='F'
                  onClick={agregarValorExtra}
                  className='btn btn-sm btn-success mb-1'
                >
                  F
                </button>
              </div>
              <div className='bg-success d-grid justify-content-center w-25'>
                <button
                  onClick={agregarValor}
                  value='6'
                  className='btn btn-dark rounded m-1'
                >
                  6
                </button>
                <button
                  onClick={agregarValor}
                  value='7'
                  className='btn btn-dark rounded m-1'
                >
                  7
                </button>
                <button
                  onClick={agregarValor}
                  value='8'
                  className='btn btn-dark rounded m-1'
                >
                  8
                </button>
                <button
                  onClick={agregarValor}
                  value='9'
                  className='btn btn-dark rounded m-1'
                >
                  9
                </button>
                <button
                  onClick={agregarValor}
                  value='0'
                  className='btn btn-dark rounded m-1'
                >
                  0
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className='display-absolute bg-success'
          style={{
            height: '100%',
            width: '100%',
            display: visibleI ? 'block' : 'none',
          }}
        >
          <div
            className='card-body w-100 bg-dark d-flex justify-content-between'
            style={{ height: '45px' }}
          >
            <h5 className='text-light ms-1 pt-2 fw-lighter'>{inputValor}</h5>
            <button onClick={delI} className='btn btn-dark my-1'>
              <i className='bi bi-arrow-left'></i>
            </button>
          </div>
          <div className='container d-flex justify-content-around'>
            <div className='mt-2'>
              <button
                className='btn btn-dark rounded w-100 my-2'
                value='1'
                onClick={agregarValorI}
              >
                1
              </button>
              <button
                className='btn btn-dark rounded w-100 my-2'
                value='2'
                onClick={agregarValorI}
              >
                2
              </button>
              <button
                className='btn btn-dark rounded w-100 my-2'
                value='3'
                onClick={agregarValorI}
              >
                3
              </button>
            </div>
            <div className='mt-2'>
              <button
                className='btn btn-dark rounded w-100 my-2'
                value='4'
                onClick={agregarValorI}
              >
                4
              </button>
              <button
                className='btn btn-dark rounded w-100 my-2'
                value='5'
                onClick={agregarValorI}
              >
                5
              </button>
              <button
                className='btn btn-dark rounded w-100 my-2'
                value='6'
                onClick={agregarValorI}
              >
                6
              </button>
            </div>
            <div className='mt-2'>
              <button
                className='btn btn-dark rounded w-100 my-2'
                value='7'
                onClick={agregarValorI}
              >
                7
              </button>
              <button
                className='btn btn-dark rounded w-100 my-2'
                value='8'
                onClick={agregarValorI}
              >
                8
              </button>
              <button
                className='btn btn-dark rounded w-100 my-2'
                value='9'
                onClick={agregarValorI}
              >
                9
              </button>
            </div>
          </div>

          <div className='d-flex justify-content-center'>
            <button
              className='btn btn-dark rounded mx-3 w-75'
              value='0'
              onClick={agregarValorI}
            >
              0
            </button>
          </div>
        </div>
        <div
          className='display-absolute bg-dark border border-dark border-2'
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
                  className='form-control'
                  value={fecha}
                  readOnly
                />
                <div className='input-group-append'>
                  <button className='btn btn-success' onClick={subirDia}>
                    +
                  </button>
                  <button className='btn btn-danger' onClick={bajarDia}>
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='card-body bg-dark border-bottom border-top border-light rounded mx-3 mt-1'>
            <h3 className='text-light text-center ms-1 pt-2 fw-lighter'>
              Detalles del TICKET:
            </h3>
            <h3 className='text-light text-center ms-1'>
              {detalle.join(' ') + ' ' + inputValor + ' ' + fecha + ' ' + selectedButton}
            </h3>
          </div>
          <div className='d-flex justify-content-center mt-2'>
            <button className='btn btn-success'>GUARDAR</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
