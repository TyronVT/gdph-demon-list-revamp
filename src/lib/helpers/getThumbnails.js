import pb from "../../pocketbase";

export async function getThumbnails() {
    await pb.collection('level_thumbnails_display').getFullList({})
} 