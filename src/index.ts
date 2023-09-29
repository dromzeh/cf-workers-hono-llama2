import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { Ai } from '@cloudflare/ai';
import { Bindings } from './types/bindings';
import { formDataSchema } from './schema/form-schema';

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', prettyJSON(), cors());

app.post('/llama2', async (c) => {
    const ai = new Ai(c.env.AI);

    const formData = Object.fromEntries(await c.req.formData());
    const parsedData = formDataSchema.safeParse(formData);

    if (!parsedData.success) {
        return c.json({
            error: parsedData.error.format(),
        });
    }

    const AIResponse = (await ai.run('@cf/meta/llama-2-7b-chat-int8', {
        prompt: parsedData.data.prompt,
    })) as string;

    return c.json({ status: 'ok', AIResponse }, 200);
});

app.onError((e, c) => {
    console.error(e);
    return c.json(
        {
            status: 'error',
            error: e.message,
        },
        500,
    );
});

export default app;
