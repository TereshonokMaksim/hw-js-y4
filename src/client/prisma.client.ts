import { PrismaClient } from "../generated/prisma"; 

export const prisma = new PrismaClient();
// const DATA_FILE_PATH: string = pathModule.join(__dirname, "..", "data.json");
// const postsData: Post[] = JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8"));

