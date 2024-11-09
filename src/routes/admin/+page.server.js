import { redirect } from '@sveltejs/kit';
import { SERVER_URL } from '../../config';
import Level from '../levels/Level.svelte';

function formatDateForPocketBase(datetimeLocal) {
    const date = new Date(datetimeLocal);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000Z`;
}

export const actions = {
    newChangeDemonRank: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        try {
            var newRank = Number(data['level_rank_int']);
            var levelName = data['level_name'];
            const changeDemonRankURL = `${SERVER_URL}/api/change_level_rank`;
            let jsonData = {
                "level_name": levelName,
                "rank": newRank
            };
            const response = await fetch(
                `${changeDemonRankURL}/${encodeURIComponent(JSON.stringify(jsonData))}`,
                {
                    headers: {
                        Authorization: `Bearer ${locals.pb.authStore.token}`
                    }
                }
            );
            
            if (!response.ok) {
                return {
                    formname: "changeDemonRank",
                    level_name: levelName,
                    level_new_rank: newRank,
                    error: "401: Unauthorized!" 
                };
            } else {
                await locals.pb.collection('admin_activity').create({
                    "action": "CHANGE_DEMON_RANK",
                    "admin": locals.user.email,
                    "data": `${levelName} changed to rank ${newRank}`,
                });
    
                return {
                    formname: "changeDemonRank",
                    level_name: levelName,
                    level_new_rank: newRank,
                    success: true 
                };
            }

        } catch (err) {
            return {
                formname: "changeDemonRank",
                level_name: levelName,
                level_new_rank: newRank,
                error: err 
            };
        }
    },

    submitDemonEndpoint: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        var levelName = data['level_name'];
        var levelRank = Number(data['level_rank']);
        try {
            const submitDemonURL = `${SERVER_URL}/api/add_level`;
            let jsonData = {
                "level_name": levelName,
                "rank": levelRank,
            };

            
            const response = await fetch(`${submitDemonURL}/${encodeURIComponent(JSON.stringify(jsonData))}`,
            {
                headers: {
                    Authorization: `Bearer ${locals.pb.authStore.token}`
                }
            });

            if (!response.ok) {
                return {
                    formname: "submitDemon",
                    level_name: levelName,
                    level_new_rank: levelRank,
                    error: "401: Not authorized!" 
                };

            } else {
                await locals.pb.collection('admin_activity').create({
                    "action": "ADD_DEMON",
                    "admin": locals.user.email,
                    "data": `${levelName} added with rank ${levelRank.toString()}`,
                });
                return {
                    formname: "submitDemon",
                    level_name: levelName,
                    level_new_rank: levelRank,
                    success: true 
                };
            }
        } catch (error) {
            return {
                formname: "submitDemon",
                level_name: levelName,
                level_new_rank: levelRank,
                error: error 
            };
        }
    },

    deleteDemonEndpoint: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        try {
            const levelName = String(data['level_name']);
            const removeDemonURL = `${SERVER_URL}/api/remove_level`;

            const response = await fetch(
                `${removeDemonURL}/${encodeURIComponent(levelName)}`,
                {
                    headers: {
                        Authorization: `Bearer ${locals.pb.authStore.token}`
                    }
                }
            );
            if (!response.ok) {
                return {
                    formname: "deleteDemon",
                    level_name: levelName,
                    error: "401: Unauthorized!" 
                };
            } else {
                console.log(JSON.stringify(response));
                await locals.pb.collection('admin_activity').create({
                    "action": "DELETE_DEMON",
                    "admin": locals.user.email,
                    "data": `${levelName} deleted.`,
                });
    
                return {
                    formname: "deleteDemon",
                    level_name: levelName,
                    success: true 
                };
            }

        } catch (error) {
            return {
                formname: "deleteDemon",
                level_name: levelName,
                error: error 
            };
        }
    },

    addPlayer: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        try {
            const record = await locals.pb.collection('player_table').create(data);
            await locals.pb.collection('admin_activity').create({
                "action": "ADD_PLAYER",
                "admin": locals.user.email,
                "data": record
            });
            return {
                formname: "addPlayer",
                player_name: data['player_name'],
                success: true
            };
        } catch (error) {
            return { 
                formname: "addPlayer",
                player_name: data['player_name'],
                error: error.message,
                actual_error: error.data.data.player_name.message
            };
        }
    },

    removePlayer: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        try {
            let players = await locals.pb.collection('player_table').getFullList();
            let player = players.find(p => p['player_name'] === data['player_name']);
            if (!player) {
                return { 
                    formname: "removePlayer",
                    error: 'Player not found',
                    player_name: data['player_name'] 
                };
            }
            let deletePlayerRecord = await locals.pb.collection('player_table').delete(player.id);
            let deleteData = {
                'status': deletePlayerRecord,
                'player_name': data['player_name']
            }
            await locals.pb.collection('admin_activity').create({
                "action": "REMOVE_PLAYER",
                "admin": locals.user.email,
                "data": deleteData
            });

            return { 
                formname: "removePlayer",
                success: true,
                player_name: data['player_name']
            };
        } catch (error) {
            return { 
                formname: "removePlayer",
                player_name: data['player_name'],
                error: error.message 
            };
        }
    },

    addDemonToPlayer: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        try {
            data.completed_at = formatDateForPocketBase(data.completed_at);
            const record = await locals.pb.collection('player_levels').create(data);
            await locals.pb.collection('admin_activity').create({
                "action": "ADD_DEMON_TO_PLAYER",
                "admin": locals.user.email,
                "data": record
            });

            return { 
                formname: "addDemonToPlayer",
                player_name: data['player_name'],
                level_name: data['level_name'],
                success: true,
            };
        } catch (error) {
            console.log(JSON.stringify(error));
            return { 
                formname: "addDemonToPlayer",
                error: "Something went wrong.", 
                player_name: data['player_name'],
                level_name: data['level_name']
            };
        }
    },

    removeDemonFromPlayer: async({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        const record = await locals.pb.collection('player_levels')
            .getFullList({
                filter: `player_name="${data['player_name']}" && level_name="${data['level_name']}"`
            });
        console.log(JSON.stringify(record));
        try {
            const deleteRecord = await locals.pb.collection('player_levels').delete(record[0]["id"]);
            return { 
                formname: "removeDemonFromPlayer",
                player_name: data['player_name'],
                level_name: data['level_name'],
                success: true,
            };

        } catch (error) {
            return { 
                formname: "removeDemonFromPlayer",
                player_name: data['player_name'],
                level_name: data['level_name'],
                error: "Something went wrong removing.",
            };
        }

    },

    postAnnouncement: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        try {
            const record = await locals.pb.collection('announcements').create({
                'richhtml': data.announcement_content
            });

            await locals.pb.collection('admin_activity').create({
                "action": "CREATE_ANNOUNCEMENT",
                "admin": locals.user.email,
                "data": record
            });

            if (record) {
                return {
                    formname: "postAnnouncement",
                    status: "Success"
                }
            }    
        } catch(error) {
            console.log(`Error posting announcement. ${error}`);
        }
    },

    deleteAnnouncement: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        try {
            const deleteAnnouncementRecord = await locals.pb.collection('announcements').delete(data.announcement_id);
            const logRecord = await locals.pb.collection('admin_activity').create({
                "action": "DELETE_ANNOUNCEMENT",
                "admin": locals.user.email,
                "data": deleteAnnouncementRecord 
            })
            return {
                formname: "deleteAnnouncement",
                success: true
            }
        } catch(error) {
            return {
                formname: "deleteAnnouncement",
                error: error.message
            }
        }
    }
}

export const load = async ({ locals, parent }) => {
    await locals.pb.collection('users').authRefresh();
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login');
    }

    async function getLevels() {
        return await locals.pb.collection("levels").getFullList({ sort: 'level_rank_int' });
    }

    async function getPlayers() {
        return await locals.pb.collection("player_table").getFullList({ sort: 'player_name' });
    }

    async function getPlayerLevels() {
        return await locals.pb.collection("player_levels").getFullList({sort: 'player_name'});
    }

    async function getAnnouncements() {
        return await locals.pb.collection("announcements").getFullList({sort: 'created'});
    }

    async function getSpecificPlayerLevels(playerName) {
        return await locals.pb.collection("player_levels").getFulList(`player_name="${playerName}"`);
    }

    return {
        user: locals.user,
        levels: await getLevels(),
        players: await getPlayers(),
        player_levels: await getPlayerLevels(),
        announcements: await getAnnouncements(),
    }
}