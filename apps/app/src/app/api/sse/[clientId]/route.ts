import { NextRequest, NextResponse } from 'next/server';
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;
}

export async function POST(req: Request) {
  const message = await req.json();
  emitter.emit('newMessage', message);
  return NextResponse.json({});
}
