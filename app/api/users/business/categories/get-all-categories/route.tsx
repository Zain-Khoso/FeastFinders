import { BusinessCategory } from '@/models/business_categories';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const categories = await BusinessCategory.find({});

        return NextResponse.json({
            status: true,
            message: 'Categories found',
            categories,
        });
    } catch {
        return NextResponse.json({
            message: 'Internal server error.',
            status: false,
        });
    }
}
