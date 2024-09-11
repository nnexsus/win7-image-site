export default async (req, context) => {
    const { id } = context.params;

    const body = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`<img width="100%" src="https://arina.lol/api/win7/acfile/${id}"/> <h1>${ id }</h1>`));
        }
      });

    return new Response(body);
};

export const config = {
    path: "/image/:id"
};  