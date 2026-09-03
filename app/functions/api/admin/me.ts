export const onRequestGet = async (context: {
  request: Request;
}): Promise<Response> => {
  const { request } = context;

  const email =
    request.headers.get('cf-access-authenticated-user-email') ||
    request.headers.get('x-authenticated-user') ||
    'admin@tradicional-coffee.shop';

  return new Response(
    JSON.stringify({
      email,
      zeroTrustActive: Boolean(request.headers.get('cf-access-authenticated-user-email')),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
