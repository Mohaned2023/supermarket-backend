import { swaggerInterface } from "src/interfaces/interfaces";
import { ReturnedInvoiceEntity } from "../entities/returned-invoice.entity";


export const createDoc: swaggerInterface = {
    operation: {
        summary: 'Creating Returned Invoice.',
        description: 'Creating returned invoice in the database. - `Role: Accountant`'
    },
    responses: {
        success: {
            description: 'Created successfully.',
            type: ReturnedInvoiceEntity
        },
        badRequest: {
            description: 'No items or number of items is greater than number of items in the invoice or The number of pills greater than The number of pills in the invoice.',
        },
        notFound: {
            description: 'Item not found in the database.'
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to create the returned invoice.',
        }
    }
}