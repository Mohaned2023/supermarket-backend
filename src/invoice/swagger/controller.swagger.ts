import { swaggerInterface } from "src/interfaces/interfaces";
import { InvoiceEntity } from "../entities/invoice.entity";


export const createDoc: swaggerInterface = {
    operation: {
        summary: 'Creating Invoice',
        description: 'Creating invoice in the database. - `Role: Accountant`'
    },
    responses: {
        success: {
            description: 'The invoice created successfully.',
            type: InvoiceEntity
        },
        notFound: {
            description: 'One of the items is not found in the database.'
        },
        badRequest: {
            description: 'There no loger enough items in the database.'
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to create the invoice.',
        }
    }
}
export const findDoc: swaggerInterface = {
    operation: {
        summary: 'Find Invoce',
        description: 'Find invoice in the database. - `Role: Any`'
    },
    responses: {
        success: {
            description: 'The invoice.',
            type: InvoiceEntity
        },
        notFound: {
            description: 'The invoice not found in the database.'
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        }
    }
}
export const deleteDoc: swaggerInterface = {
    operation: {
        summary: 'Deleting Invoice.',
        description: 'Deleting invoice from the database. - `Role: Accountant`'
    },
    responses: {
        success: {
            description: 'Deleted successfully',
            example: { message: 'The Invoice With ID 1 Has Been Deleted.' }
        },
        notFound: {
            description: 'The invoice not found in the database.'
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to delete the invoice.',
        }
    }
}
