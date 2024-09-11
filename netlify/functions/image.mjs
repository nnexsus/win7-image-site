export default async (req, context) => {
    const { id } = context.params;

    return new Response(`${ id }`);
};

export const config = {
    path: "/image/:id"
};