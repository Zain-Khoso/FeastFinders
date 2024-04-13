import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcrypt';
import { connectToMongodb } from '@/utils/db';
import { Business } from '@/models/business';

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
            buiness_name,
            buiness_hours,
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

        const business = await Business.create({
            buiness_name,
            buiness_hours,
            address,
            gender,
            dob,
            about_me,
            userId: user?._id,
        });

        await business.save();

        const updatedUser = await User.findByIdAndUpdate(
            { _id: user?._id },
            { business: business?._id },
            { new: true }
        );

        updatedUser['user'] = business;

        return NextResponse.json({
            message: 'User created successfully',
            status: true,
        });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            message: 'Failed to create user',
            status: false,
        });
    }
}
