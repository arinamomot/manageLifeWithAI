import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../../shared/constants/auth-options';
import { prisma } from '../../../../prisma/prisma-client';

export const dynamic = 'force-dynamic';

export async function GET(req: any, res: any) {
    try {
        const user = await getServerSession(req, res, authOptions);

        if (!user) {
            return NextResponse.json(
                { error: "Not authorized" },
                { status: 401 })
        }

        const data = prisma.user.findUnique({
            where: {
                id: Number(user.user.id)
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                password: false
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: '[USER_GET] Server error' }, { status: 500 });
    }
}