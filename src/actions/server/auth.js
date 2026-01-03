'use server';
import { dbConnect } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function postUser(payload) {
  // check user exits or not
  const isExist = await dbConnect('users').findOne({ email: payload.email });

  if (isExist)
    return {
      success: false,
      message: 'user already exit',
    };
  //  create user
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const newUser = {
    ...payload,
    createdAt: new Date().toISOString(),
    role: 'user',
    password: hashPassword,
  };
  //  store user into DB
  const result = await dbConnect('users').insertOne(newUser);

  if (result.acknowledged) {
    return {
      success: true,
      message: `User is registered with this id ${result.insertedId.toString()}`,
    };
  } else {
    return {
      success: false,
      message: `Something went wrong`,
    };
  }
}
