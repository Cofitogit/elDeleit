import { useEffect, useState } from 'react';
import { useBookStore } from '../src/store/bookStore';

export default function Detalle({ visibleD }) {
  const [vPan, setvPan] = useState('');
  const [detalle, setDetalle] = useState(['', 'Kg de pan']);

  const updateF = useBookStore(s => s.updateFinalD)

  useEffect(() => {
    updateF(detalle)
  }, [detalle]);

  let pantalla = false;

  if (detalle[0] !== '') {
    pantalla = true;
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

  return (
    <div
      className='display-absolute bg-success border border-success'
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
  );
}
