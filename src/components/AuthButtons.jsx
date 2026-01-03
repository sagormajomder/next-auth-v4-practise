'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import LogginButton from './LogginButton';

export default function AuthButtons() {
  const session = useSession();
  return (
    <div className='flex gap-5'>
      {session.status === 'authenticated' ? (
        <button className='btn btn-primary' onClick={() => signOut()}>
          Logout
        </button>
      ) : (
        <>
          <LogginButton />
          <Link href={'/register'} className='btn'>
            Register
          </Link>
        </>
      )}
    </div>
  );
}
