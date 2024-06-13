import { error, redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());
        try {
            await locals.pb.admins.authWithPassword(body.email, body.password);
            if(!locals.pb?.authStore?.isValid) {
                locals.pb.authStore.clear()
                return {
                    notVerified: true
                }
            }
        } catch (err) {
            console.log("[login/page.server.js]:", err)
            throw error(500, "Invalid credentials.");
        }
        throw redirect(303, '/admin');
    }
}