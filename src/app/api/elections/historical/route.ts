import { NextResponse } from 'next/server';
import { mockHistoricalData } from '@/lib/mockData';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(mockHistoricalData);
}
