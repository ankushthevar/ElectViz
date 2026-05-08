import { NextResponse } from 'next/server';
import { mockLiveData } from '@/lib/mockData';

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Update lastUpdated to now
  const data = {
    ...mockLiveData,
    lastUpdated: new Date().toISOString()
  };
  
  return NextResponse.json(data);
}
