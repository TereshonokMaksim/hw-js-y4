export interface GenericValidatorsTypes {
    validateId(id: string): boolean | string
    isURL(url: string): boolean
}