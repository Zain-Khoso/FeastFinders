import { BusinessCategory } from '@/models/business_categories';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const apiHeaders = headers();
        const { name } = await req.json();

        const isAdmin = apiHeaders.get('source')?.toLowerCase() === 'admin';

        if (!isAdmin) {
            return NextResponse.json({
                status: false,
                message: 'Access denied.',
            });
        }

        const category = await BusinessCategory.create({ name });
        await category.save();

        return NextResponse.json({
            status: true,
            message: 'New category added successfully.',
            category,
        });
    } catch {
        return NextResponse.json({
            message: 'Internal server error.',
            status: false,
        });
    }
}
