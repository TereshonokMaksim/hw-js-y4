import { Request, Response } from 'express';
import { Prisma } from '../generated/prisma';
import { ErrorResponse } from '../generic/generic.error.messages';

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
    getAllTags(request: Request<void, Tag[] | ErrorResponse, void, {take?: string, skip?: string}>, response: Response<Tag[] | ErrorResponse>): void
    getTagById(request: Request<{id: string}, Tag | ErrorResponse, void, void>, response: Response<Tag | ErrorResponse>): void
}

export interface TagRepositoryContract {
    getAllTags(take?: number, skip?: number): Promise<Tag[]>
    getTagById(id: number): Promise<Tag | null | undefined>
}