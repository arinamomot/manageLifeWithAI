'use server';

import { prisma } from '@/prisma/prisma-client';
import { VerificationUserTemplate } from '@/shared/components/shared/email-templates/verification-user';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { sendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib';
import { put } from '@vercel/blob/client';

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

    let imageUrl = body.image;
    if (body.image instanceof File) {
      console.log('Uploading image...');
      imageUrl = await uploadImage(body.image);
    }

    await prisma.user.update({
      where: { id: Number(currentUser.id) },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : user?.password,
        dateOfBirth: body.dateOfBirth,
        gender: body.gender,
        image: imageUrl
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
  
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      await prisma.verificationCode.create({
        data: {
          code,
          userId: createdUser.id,
          expiresAt
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

  export async function uploadImage(file: File): Promise<string> {
    try {
      const uniqueSuffix = `-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const filename = file.name.replace(/(\.[^/.]+)$/, `${uniqueSuffix}$1`);
  
      const { url } = await put(filename, file, {
        token: process.env.BLOB_READ_WRITE_TOKEN as string,
        access: 'public'
      });
      
      console.log('Image uploaded:', url);
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  export async function createHabit(body: Prisma.HabitCreateInput) {
    try {
      const currentUser = await getUserSession();

      if (!currentUser) {
        throw new Error('User not found');
      }

      await prisma.habit.create({
        data: {
          name: body.name,
          goal: body.goal,
          priority: body.priority,
          userId: body?.user?.connect?.id || Number(currentUser.id),
        },
      });
    } catch (error) {
      console.log('Error [CREATE_HABIT]', error);
      throw error;
    }
  }
