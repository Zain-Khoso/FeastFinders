import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { query, passowrd } = await req.json();
        let user;
        if (query.includes('@')) {
            user = await User.findOne({ email: query });
        } else {
            user = await User.findOne({ username: query });
        }

        if (!user) {
            return NextResponse.json({
                status: false,
                message: 'Invalid Credentials!',
            });
        }

        const isValidPassword = await bcryptjs.compare(
            passowrd,
            user?.password
        );
        if (!isValidPassword) {
            return NextResponse.json({
                status: false,
                message: 'Invalid Credentials!',
            });
        }

        const payload = {
            user: {
                _id: user?._id,
            },
        };

        const token = jwt.sign(payload, 'dsadasd');
        return NextResponse.json({
            status: true,
            message: 'Logged in successfully',
            token,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to login',
            status: false,
        });
    }
}
