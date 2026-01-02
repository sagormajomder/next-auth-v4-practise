import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function UserServerCard() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <h2>User Server</h2>
      <div className='border'>{JSON.stringify(session)}</div>
    </div>
  );
}
