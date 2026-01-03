'use client';
import { signIn } from 'next-auth/react';
export default function LogginButton() {
  return (
    <button className='btn btn-primary' onClick={() => signIn()}>
      Log in Button
    </button>
  );
}
