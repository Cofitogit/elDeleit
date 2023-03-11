import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { sucursal } from '../../data';

export default function suc() {
  const router = useRouter();
  const { id } = router.query;
  const [visibleD, setVisibleD] = useState(false);
  const [visibleI, setVisibleI] = useState(false);
  const [visibleF, setVisibleF] = useState(false);
  const [isSelectedM, setIsSelectedM] = useState(false);
  const [isSelectedT, setIsSelectedT] = useState(false);
  const [kilos, setKilos] = useState('');
  let detalle = [kilos,'Kg de pan']

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

  function selectedM(e) {
    e.preventDefault();
    setIsSelectedM(!isSelectedM);
    setIsSelectedT(false);
  }

  function selectedT(e) {
    e.preventDefault();
    setIsSelectedT(!isSelectedT);
    setIsSelectedM(false);
  }

  function agregarValor(e) {
    e.preventDefault();
    setKilos(kilos + e.target.value);
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
          onClick={selectedM}
          style={{ opacity: isSelectedM ? 1 : 0.2 }}
        >
          Mañana
        </button>
        <button
          className='btn btn-secondary rounded-0 rounded-end border-start border-dark'
          onClick={selectedT}
          style={{ opacity: isSelectedT ? 1 : 0.2 }}
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
        style={{ height: '290px', width: '250px' }}
      >
        <div
          className='display-absolute bg-success'
          style={{
            height: '100%',
            width: '100%',
            display: visibleD ? 'block' : 'none',
          }}
        >
          <div className='card-body w-100 bg-dark' style={{ height: '45px' }}>
            <h5 className='text-light ms-1 pt-2 fw-lighter'>
              {`${detalle[0]} ${detalle[1]}`}
            </h5>
          </div>
          <div className='container'>
            <div className='row mt-1'>
              <div className='bg-success d-grid justify-content-center w-25'>
                <button onClick={agregarValor} value='1' className='btn btn-dark rounded m-1'>1</button>
                <button onClick={agregarValor} value='2' className='btn btn-dark rounded m-1'>2</button>
                <button onClick={agregarValor} value='3' className='btn btn-dark rounded m-1'>3</button>
                <button onClick={agregarValor} value='4' className='btn btn-dark rounded m-1'>4</button>
                <button onClick={agregarValor} value='5' className='btn btn-dark rounded m-1'>5</button>
              </div>
              <div className='bg-dark w-50 d-grid'>
                <button value='R' className='btn btn-sm btn-success mt-1'>R</button>
                <button value='C' className='btn btn-sm btn-success my-2'>C</button>
                <button value='F' className='btn btn-sm btn-success mb-1'>F</button>
              </div>
              <div className='bg-success d-grid justify-content-center w-25'>
                <button onClick={agregarValor} value='6' className='btn btn-dark rounded m-1'>6</button>
                <button onClick={agregarValor} value='7' className='btn btn-dark rounded m-1'>7</button>
                <button onClick={agregarValor} value='8' className='btn btn-dark rounded m-1'>8</button>
                <button onClick={agregarValor} value='9' className='btn btn-dark rounded m-1'>9</button>
                <button onClick={agregarValor} value='0' className='btn btn-dark rounded m-1'>0</button>
              </div>
            </div>
          </div>
        </div>
        <div
          className='display-absolute bg-info'
          style={{
            height: '100%',
            width: '100%',
            display: visibleF ? 'block' : 'none',
          }}
        ></div>
        <div
          className='display-absolute bg-primary'
          style={{
            height: '100%',
            width: '100%',
            display: visibleI ? 'block' : 'none',
          }}
        ></div>
      </div>
    </Layout>
  );
}
