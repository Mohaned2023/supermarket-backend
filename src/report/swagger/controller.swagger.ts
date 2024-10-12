import { swaggerInterface} from "src/interfaces/interfaces";

export const itemDoc: swaggerInterface = {
    operation: {
        summary: 'Getting Items Report.',
        description: 'Getting the items report from the database. - `Role: Admin`'
    },
    responses: {
        success: {
            description: 'Created successfully.',
            example: {
                report: {
                    totalNumberOfItem: 200,
                    avgSellPillPrice: 20300.4,
                    avgBuyPillPrice: 19800.3,
                    totalNumberOfAllItems: 30000,
                    totalSellPrice: 120000,
                    totalBuyPrice: 113900,
                    avgProductionDate: new Date(),
                    avgExpiryDate: new Date()
                },
                user: {
                    username: 'mohaned',
                    displayName: 'Mohaned Sherhan (Mr.x)',
                    accountType: 'ADMIN'
                },
                createAt: new Date()
            }
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to create the items report.',
        }
    }
}
export const invoiceDoc: swaggerInterface = {
    operation: {
        summary: 'Getting Invoices Report.',
        description: 'Getting the invoices report from the database. - `Role: Admin`'
    },
    responses: {
        success: {
            description: 'Created successfully.',
            example: {
                report: {
                    totalNumberOfAllPills: 30000,
                    totalNumberOfAllItems: 200,
                    totalNumberOfAllInvoices: 200,
                    avgOfAllInvoicesPrice: 3000,
                    totalPriceOfAllInvoices: 20300.4
                },
                user: {
                    username: 'mohaned',
                    displayName: 'Mohaned Sherhan (Mr.x)',
                    accountType: 'ADMIN'
                },
                createAt: new Date()
            }
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to create the invoices report.',
        }
    }
} 
export const returnedInvoiceDoc: swaggerInterface = {
    operation: {
        summary: 'Getting Returned Invoices Report.',
        description: 'Getting the returned invoices report from the database. - `Role: Admin`'
    },
    responses: {
        success: {
            description: 'Created successfully.',
            example: {
                report: {
                    totalNumberOfAllPills: 30000,
                    totalNumberOfAllItems: 200,
                    totalNumberOfAllInvoices: 200,
                    avgOfAllInvoicesPrice: 3000,
                    totalPriceOfAllInvoices: 20300.4
                },
                user: {
                    username: 'mohaned',
                    displayName: 'Mohaned Sherhan (Mr.x)',
                    accountType: 'ADMIN'
                },
                createAt: new Date()
            }
        },
        unauthorized: {
            description: 'You do not have the right JWT token.',
        },
        forbidden: {
            description: 'You do not have the permission to create the retuned invoices report.',
        }
    }
} 
