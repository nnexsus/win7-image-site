export default async (req, context) => {
    const { id } = context.params;

    return new Response(`Hello, world! ${ id }`);
};