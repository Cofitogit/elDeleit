import Link from 'next/link';
export default function Navbar() {
  return (
    <nav className='navbar bg-body-tertiary border-bottom border-top border-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand fw-bolder text-success mx-auto' href='/'>
          El Deleit
        </Link>
      </div>
    </nav>
  );
}