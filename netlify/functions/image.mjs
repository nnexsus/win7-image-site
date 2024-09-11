export default async (req, context) => {
    const { id } = context.params;

    return new Response(`
    <!DOCTYPE html>
    <html lang="en">
        <img width="100%" src="https://arina.lol/api/win7/acfile/${id}"/> <h1>${ id }</h1>
    </html>`);
};

export const config = {
    path: "/image/:id"
};  