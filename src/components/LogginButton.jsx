'use client';
import { signIn } from 'next-auth/react';
export default function LogginButton() {
  return <button onClick={() => signIn()}>Log in Button</button>;
}
