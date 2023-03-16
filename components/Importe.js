import { useEffect, useState } from "react";
import { useBookStore } from "../src/store/bookStore";


function Importe({visibleI}) {

  const [inputValor, setInputValor] = useState('$');
  const updateFinalI = useBookStore(s => s.updateFinalI)

  useEffect(() => {
    updateFinalI(inputValor)
  }, [inputValor])
  
    
  function delI(e) {
    e.preventDefault();
    setInputValor('$');
  }

  function agregarValorI(e) {
    if (inputValor.length > 5) {
      return;
    }
    setInputValor(inputValor + e.target.value);
  }


  return (
    <div
    className='display-absolute bg-success border border-success'
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
          value='4'
          onClick={agregarValorI}
        >
          4
        </button>
        <button
          className='btn btn-dark rounded w-100 my-2'
          value='7'
          onClick={agregarValorI}
        >
          7
        </button>
      </div>
      <div className='mt-2'>
        <button
          className='btn btn-dark rounded w-100 my-2'
          value='2'
          onClick={agregarValorI}
        >
          2
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
          value='8'
          onClick={agregarValorI}
        >
          8
        </button>
      </div>
      <div className='mt-2'>
        <button
          className='btn btn-dark rounded w-100 my-2'
          value='3'
          onClick={agregarValorI}
        >
          3
        </button>
        <button
          className='btn btn-dark rounded w-100 my-2'
          value='6'
          onClick={agregarValorI}
        >
          6
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
  )
}

export default Importe