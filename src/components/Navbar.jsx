import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='border-b-2 text-center py-3 space-x-6'>
      <Link href={'/'}>Home</Link>
      <Link href={'/public'}>Public</Link>
      <Link href={'/private'}>Private</Link>
      <Link href={'/admin'}>Admin</Link>
    </div>
  );
}
