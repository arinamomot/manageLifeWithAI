'use server';

import { prisma } from '@/prisma/prisma-client';
import { VerificationUserTemplate } from '@/shared/components/shared/email-temapltes/verification-user';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { sendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib';

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const user = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: { id: Number(currentUser.id) },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : user?.password,
        dateOfBirth: body.dateOfBirth,
        gender: body.gender,
      }
    });
  } catch (error) {
    console.log('Error [UPDATE_USER]', error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });
  
      if (user) {
        if (!user.verified) {
          throw new Error('Email not confirmed');
        }
  
        throw new Error('The user already exists');
      }
  
      const createdUser = await prisma.user.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: hashSync(body.password, 10),
        },
      });
  
      const code = Math.floor(100000 + Math.random() * 900000).toString();
  
      // TODO: time limit
      await prisma.verificationCode.create({
        data: {
          code,
          userId: createdUser.id,
        },
      });

  
      await sendEmail(
        createdUser.email,
        'Blissipline / 📝 Registration confirmation',
        await VerificationUserTemplate({
          code,
        }),
      );
    } catch (err) {
      console.log('Error [CREATE_USER]', err);
      throw err;
    }
  }