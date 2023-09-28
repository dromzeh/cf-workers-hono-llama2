# cf-workers-hono-llama2

example of using `@cf/meta/llama-2-7b-chat-int8` inside of a cf worker using hono

endpoint for request is [POST] `/llama2` - takes in formdata with `prompt`, validation viewable in `./src/schema/form-schema` using zod for validation

## deployment

```
pnpm install
pnpm run dev
```

```
pnpm run deploy
```
