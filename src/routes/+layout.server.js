export const load = ({ locals }) => {
    if (locals.user) {
        console.log(locals.user)
        return {
            user: locals.user
        };
    }
    return {
        user: undefined
    };
}