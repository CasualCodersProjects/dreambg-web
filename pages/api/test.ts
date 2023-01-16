export const config = {
  runtime: 'edge',
}

export default function handler(req: Request) {
  // send json response
  return new Response(JSON.stringify({ hello: 'world' }));
}
