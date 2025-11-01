import { Request, Response } from 'express';
import { Prisma } from '../generated/prisma';

export type Tag = Prisma.TagGetPayload<{}>

// export type CreateTag = Prisma.TagUncheckedCreateInput
// export type CreateTagChecked = Prisma.TagCreateInput
// export type UpdateTag = Prisma.TagUncheckedUpdateInput
// export type UpdateTagChecked = Prisma.TagUpdateInput

export interface TagServiceContract {
    getAllTags(take?: number, skip?: number): Promise<Tag[]>
    getTagById(id: number): Promise<Tag | null | undefined>
    validateId(id: string): Promise<Boolean | string>
}

export interface TagControllerContract {
    getAllTags(request: Request<void, Tag[] | string, void, {take?: string, skip?: string}>, response: Response<Tag[] | string>): void
    getTagById(request: Request<{id: string}, Tag | String, void, void>, response: Response<Tag | string>): void
}

export interface TagRepositoryContract {
    getAllTags(take?: number, skip?: number): Promise<Tag[]>
    getTagById(id: number): Promise<Tag | null | undefined>
}