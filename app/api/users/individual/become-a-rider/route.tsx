import { Individual } from '@/models/individual';
import { Rider } from '@/models/rider';
import { connectToMongodb } from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

connectToMongodb();

export async function POST(req: NextRequest) {
    try {
        const { individual_id } = await req.json();

        const individual = await Individual.findOne({ _id: individual_id });
        if (!individual) {
            return NextResponse.json(
                {
                    status: false,
                    message: 'No account found!',
                },
                {
                    status: 404,
                }
            );
        }

        if (individual?.rider) {
            return NextResponse.json(
                {
                    status: false,
                    message: 'Already a rider',
                },
                {
                    status: 400,
                }
            );
        }

        const dobString = individual?.dob;
        if (!dobString) {
            return NextResponse.json(
                {
                    status: false,
                    message: 'Date of birth is not available.',
                },
                {
                    status: 403,
                }
            );
        }
        const dob = new Date(dobString);
        const age = Math.floor(
            (new Date().getTime() - dob.getTime()) /
                1000 /
                60 /
                60 /
                24 /
                365.25
        );

        if (+age < 18) {
            return NextResponse.json(
                {
                    status: false,
                    message:
                        'You must be at least 18 years old to become a rider.',
                },
                {
                    status: 403,
                }
            );
        }

        const rider = await Rider.create({
            user_id: individual_id,
        });

        await rider.save();

        await Individual.findByIdAndUpdate(
            individual_id,
            {
                rider: rider._id,
            },
            { new: true }
        );

        return NextResponse.json({
            status: true,
            message: 'Became a rider successfully!',
        });
    } catch {
        return NextResponse.json({
            status: false,
            message: 'Internal server error.',
        });
    }
}
