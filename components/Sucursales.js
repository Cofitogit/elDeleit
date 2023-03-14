import Link from 'next/link';
import { sucursal } from '../data';

export default function Sucursales() {

  return (
    <div className='container d-grid justify-content-center'>
      {sucursal.map((s) => {
        let id = 0;
        switch (s) {
            case 'Pueblo Mío':
                id = 0;
                break;
            case 'Prado':
                id = 1;
                break;
            case 'Pulperia':
                id = 2;
                break;
            default:
                break;
        }
        return (
          <Link href={`/sucursal/${id}`} className='text-decoration-none' key={id} id={id}>
            <div className='card mt-4 bg-success'>
              <div className='card-body m-4'>
                <h1 className='text-center text-dark'>{s}</h1>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
