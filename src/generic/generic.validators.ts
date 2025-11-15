import { GenericValidatorsTypes } from "./generic.types";

export const GenericValidators: GenericValidatorsTypes = {
    validateId(id){
        if (!id){
            return "ID is required."
        }
        if (id.trim().length == 0){
            return "ID must be a number, not just spaces."
        }
        if (isNaN(+id)){
            return "ID must be a number."
        }   
        if (Math.round(+id) != +id){
            return "ID should be INTEGER, not float."
        }
        if (+id < 0){
            return "ID should be positive number."
        }
        return true
    },
    isURL(urlString){
        try{
            new URL(urlString);
            return true
        }
        catch{
            return false
        }
    }
}