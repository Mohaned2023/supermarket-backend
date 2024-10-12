import { swaggerInterface } from "src/interfaces/interfaces";
import { ItemEntity } from "../entities/item.entity";


export const createDoc: swaggerInterface = {
    operation: {
        summary: 'Creating New Item.',
        description: 'Creating new item in the database. - `Role: Admin`'
    },
    responses: {
        success: {
            description: 'Created successfully.',
            type: ItemEntity
        },
        badRequest: {
            description: 'ID is already exist in the database.'
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to create items.',
        }
    }
}
export const deleteDoc: swaggerInterface = {
    operation: {
        summary: 'Deleting Itme.',
        description: 'Deleting the itme from the database. - `Role: Admin`'
    },
    responses: {
        success: {
            description: 'Deleted successfully.',
            example: {message: 'The item with id 1 has been deleted.'}
        },
        notFound: {
            description: '`Item with id not found'
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to delete items.',
        }
    }
}
export const updateDoc: swaggerInterface = {
    operation: {
        summary: 'Updating Itme.',
        description: 'Updating the itme in the database. - `Role: Admin`'
    },
    responses: {
        success: {
            description: 'Deleted successfully.',
            type: ItemEntity
        },
        notFound: {
            description: '`Item with id not found'
        },
        badRequest: {
            description: 'Invalid update fields in the body'
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to update items.',
        }
    }
}