import { User } from '@/models/user';
import { connectToMongodb } from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

connectToMongodb();

export async function POST(req: NextRequest) {
    const errors = {
        username: '',
        email: '',
        phone: '',
    };
    try {
        const { username, email, phone } = await req.json();

        let user = username ? await User.findOne({ username }) : '';
        if (user) errors.username = 'Username taken.';

        user = email ? await User.findOne({ email }) : '';
        if (user) errors.email = 'Email belongs to another account.';

        user = phone ? await User.findOne({ phone }) : '';
        if (user) errors.phone = 'Phone number is in use.';

        if (errors.username || errors.email || errors.phone) {
            return NextResponse.json({
                errors,
                status: false,
            });
        }

        return NextResponse.json({
            status: true,
            message: 'User Available',
        });
    } catch {
        return NextResponse.json({
            message: 'Internal server error.',
            status: false,
        });
    }
}
