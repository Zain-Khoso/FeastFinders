import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcrypt';
import { connectToMongodb } from '@/utils/db';
import { Business } from '@/models/business';
import { BusinessCategory } from '@/models/business_categories';

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
            business_name,
            business_hours,
            business_category,
            address,
            gender,
            dob,
            about_me,
        } = await req.json();

        const businessCategory = await BusinessCategory.findOne({
            _id: business_category,
        });

        if (!businessCategory) {
            return NextResponse.json({
                status: false,
                message: 'Invalid Business Category',
            });
        }

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
            business_name,
            business_hours,
            address,
            gender,
            dob,
            about_me,
            userId: user?._id,
            business_category,
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
        return NextResponse.json({
            message: 'Failed to create user',
            status: false,
        });
    }
}
