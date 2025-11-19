export type ErrorResponse = {
    message: String
}

/* 
Error Code sheet:
    GENERIC:
        NOT_FOUND - object was not found in database, use in case where output is necessary, like User app
        {modelName}_EXISTS - object of such modelName already exists and such, cannot be created. Example: USER_EXISTS
        ACCESS_DENIED - User does not have permission to perform that operation, such as delete content of other users.
            Admins usually have immunity to this.
    USER SPECIFIC:
        WRONG_CREDENTIALS - credentials that user passed are wrong, such as missing data or inputting worng typed data.

Please use it as error name standart for this app
*/