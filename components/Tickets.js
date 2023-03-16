import Link from 'next/link';
import React from 'react';

function Tickets() {
  return (
    <>
      <hr />

      <Link href={'/tickets'} className='text-decoration-none'>
        <div
          className='d-flex align-self-center justify-content-center'
          href={'/tickets'}
        >
          <button className='btn btn-secondary w-50'>TICKETS</button>
        </div>
      </Link>
    </>
  );
}

export default Tickets;
