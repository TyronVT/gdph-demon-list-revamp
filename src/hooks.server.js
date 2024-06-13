import pb from "./pocketbase.js";

import { serializeNonPOJOs } from "./lib/util_functions.js";

export const handle = async ({ event, resolve }) => {
    event.locals.pb = pb;
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
    if (event.locals.pb.authStore.isValid) {
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
    } else {
        event.locals.user = undefined;
    }

    const response = await resolve(event);
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: true }));
    return response;
}