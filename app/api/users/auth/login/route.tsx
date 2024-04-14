import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToMongodb } from '@/utils/db';
import { Individual } from '@/models/individual';
import { Business } from '@/models/business';

connectToMongodb();

export async function POST(req: NextRequest) {
    try {
        const { query, password } = await req.json();

        let user = query.includes('@')
            ? await User.findOne({ email: query })
            : await User.findOne({ username: query });

        if (!user) {
            return NextResponse.json({
                status: false,
                message: 'Invalid Credentials!',
            });
        }

        const isValidPassword = await bcryptjs.compare(
            password,
            user?.password
        );

        if (!isValidPassword) {
            return NextResponse.json({
                status: false,
                message: 'Invalid Credentials!',
            });
        }

        // getting specific account details based on account type
        user[user?.account_type] =
            user?.account_type === 'individual'
                ? await Individual.findOne({ userId: user?._id })
                : await Business.findOne({ userId: user?._id });

        const payload = {
            user: {
                _id: user?._id,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!);

        return NextResponse.json({
            status: true,
            message: 'Logged in successfully',
            token,
            user,
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: 'Failed to login',
            status: false,
        });
    }
}
