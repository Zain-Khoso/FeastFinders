import { Individual } from '@/models/individual';
import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcrypt';
import { connectToMongodb } from '@/utils/db';

connectToMongodb();

export async function POST(req: NextRequest) {
    try {
        let {
            country,
            city,
            email,
            phone,
            username,
            account_type,
            password,
            firstname,
            lastname,
            address,
            gender,
            dob,
            about_me,
        } = await req.json();

        const salt = await bcryptjs.genSalt(10);
        password = await bcryptjs.hash(password, salt);

        const user = await User.create({
            country,
            city,
            email,
            phone,
            username,
            account_type,
            password,
        });

        await user.save();

        const individual = await Individual.create({
            firstname,
            lastname,
            address,
            gender,
            dob,
            about_me,
            userId: user?._id,
        });

        await individual.save();

        const updatedUser = await User.findByIdAndUpdate(
            { _id: user?._id },
            { individual: individual?._id },
            { new: true }
        );

        updatedUser['user'] = individual;

        return NextResponse.json({
            message: 'User created successfully',
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            message: 'Failed to create user',
            status: false,
        });
    }
}
