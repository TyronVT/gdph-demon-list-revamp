import { redirect } from '@sveltejs/kit';

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
    changeDemonRank: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        try {
            const newRank = Number(data['level_rank_int']);

            let levelsinDB = await locals.pb.collection('levels').getFullList({sort: 'level_rank_int'});

            let level = levelsinDB.find(lvl => lvl['level_name'] === data['level_name']);
            if (!level) {
                return { error: 'Level not found' };
            }

            const previousRank = level.level_rank_int;

            if (newRank <= 0 || newRank > levelsinDB.length) {
                return { error: 'Invalid rank' };
            }

            console.log(`Previous rank: ${previousRank} | New Rank: ${newRank}`);

            if (newRank > previousRank) {
                for (let i = previousRank; i < newRank; i++) {
                    levelsinDB[i].level_rank_int -= 1;
                    await locals.pb.collection('levels').update(levelsinDB[i].id, levelsinDB[i]);
                }
            } else if (previousRank > newRank) {
                for (let i = newRank - 1; i < previousRank - 1; i++) {
                    levelsinDB[i].level_rank_int += 1;
                    await locals.pb.collection('levels').update(levelsinDB[i].id, levelsinDB[i]);
                }
            }

            level.level_rank_int = newRank;
            let recordUpdate = await locals.pb.collection('levels').update(level.id, level);
            await locals.pb.collection('admin_activity').create({
                "action": "CHANGE_DEMON_RANK",
                "admin": locals.user.email,
                "data": recordUpdate
            });

            return {
                formname: "changeDemonRank",
                level_name: level.level_name,
                level_new_rank: newRank,
                success: true 
            };
        } catch (error) {
            return { 
                formname: "changeDemonRank",
                level_name: level.level_name,
                level_new_rank: newRank,
                error: error.message 
            };
        }
    },

    submitDemon: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        try {
            const newRank = Number(data['demon-rank']);

            let levelsinDB = await locals.pb.collection('levels').getFullList({ sort: 'level_rank_int' });

            if (newRank <= 0 || newRank > levelsinDB.length + 1) {
                return { error: 'Invalid rank' };
            }

            for (let i = newRank - 1; i < levelsinDB.length; i++) {
                levelsinDB[i].level_rank_int += 1;
                await locals.pb.collection('levels').update(levelsinDB[i].id, levelsinDB[i]);
            }

            const newLevel = {
                level_name: data['demon-name'],
                level_rank_int: newRank
            };

            let newLevelRecord = await locals.pb.collection('levels').create(newLevel);
            await locals.pb.collection('admin_activity').create({
                "action": "ADD_DEMON",
                "admin": locals.user.email,
                "data": newLevelRecord
            });

            return { 
                formname: "submitDemon",
                level_name: newLevel.level_name,
                level_rank_int: newLevel.level_rank_int,
                success: true 
            };
        } catch (error) {
            return { 
                formname: "submitDemon",
                level_name: newLevel.level_name,
                level_rank_int: newLevel.level_rank_int,
                error: error.message 
            };
        }
    },

    deleteDemon: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        
        // Index meaning: 0 - Demon Rank, 1 - Demon Name
        data['demon_data'] = data['demon_data'].split(",");
        console.log(data['demon_data'])
        try {
            const rankToDelete = Number(data['demon_data'][0]);

            let levelsinDB = await locals.pb.collection('levels').getFullList({ sort: 'level_rank_int' });

            if (rankToDelete <= 0 || rankToDelete > levelsinDB.length) {
                return { 
                    formname: "deleteDemon",
                    error: 'Invalid rank' 
                };
            }

            let level = levelsinDB.find(lvl => lvl['level_name'] === data['demon_data'][1]);
            if (!level) {
                return { 
                    formname: "deleteDemon",
                    error: 'Level not found' 
                };
            }

            for (let i = rankToDelete; i < levelsinDB.length; i++) {
                levelsinDB[i].level_rank_int -= 1;
                console.log(`Level to be decreased rank: ${levelsinDB[i].level_name} || Rank: ${levelsinDB[i].level_rank_int} || Index: ${i}`)
                await locals.pb.collection('levels').update(levelsinDB[i].id, levelsinDB[i]);
            }

            let deleteLevelRecord = await locals.pb.collection('levels').delete(level.id);
            await locals.pb.collection('admin_activity').create({
                "action": "DELETE_DEMON",
                "admin": locals.user.email,
                "data": deleteLevelRecord
            });

            return { 
                formname: "deleteDemon",
                level_name: data['demon_data'][1],
                level_rank: data['demon_data'][0],
                success: true 
            };
        } catch (error) {
            return { 
                formname: "deleteDemon",
                level_name: data['demon_data'][1],
                level_rank: data['demon_data'][0],
                error: error.message 
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
            await locals.pb.collection('admin_activity').create({
                "action": "REMOVE_PLAYER",
                "admin": locals.user.email,
                "data": deletePlayerRecord
            });

            return { 
                formname: "removePlayer",
                success: true,
                player_name: data['player_name']
            };
        } catch (error) {
            console.log(error);
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
            console.log(data);
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
            let errormsg = error.message;
            if (error.data.data.player_name.message === "Value must be unique.") {
                errormsg = "Demon already exists for player."
            }
            return { 
                formname: "addDemonToPlayer",
                error: errormsg, 
                player_name: data['player_name'],
                level_name: data['level_name']
            };
        }
    },

    postAnnouncement: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
        const record = await locals.pb.collection('announcements').create({
            'richhtml': data.announcement_content
        });
        await locals.pb.collection('admin_activity').create({
            "action": "CREATE_ANNOUNCEMENT",
            "admin": locals.user.email,
            "data": record
        });

        const records = await locals.pb.collection('announcements').getFullList();
        console.log(records);
    }
}



export const load = async ({ locals }) => {
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
        return await locals.pb.collection("player_levels").getOne('pws30t99haai7e7');
    }
    
    return {
        user: locals.user,
        levels: await getLevels(),
        players: await getPlayers(),
        player_levels: await getPlayerLevels()
    }
}