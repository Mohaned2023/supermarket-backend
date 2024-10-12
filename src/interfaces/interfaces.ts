import { ApiOperationOptions, ApiResponseOptions } from "@nestjs/swagger";
import { UserEntity } from "src/auth/entities/user.entity";

/**
 * This interface use for the JWT payload.
 */
export interface JwtPayloadInterface {
    username: string;
}

/**
 * This interface use for updating the invoce.
 */
export interface UpdateInvoiceIterface {
    items: ItemInterface[],
    totalPrice: number
}

/**
 * This interface use for return the invoice with items.
 */
export interface ItemInterface {
    itemId: number;
    name: string;
    numberOfItems: number;
    price: number;
}

/**
 * This interface use for add the invoice to the report.
 */
export interface DataInvoiceReportInterface {
    totalNumberOfAllPills: number,
    totalNumberOfAllItems: number,
    totalNumberOfAllInvoices: number,
    avgOfAllInvoicesPrice: number,
    totalPriceOfAllInvoices: number
}

/**
 * This interface use for creating the invoice report.
 */
export interface InvoiceReportInterface {
    report: DataInvoiceReportInterface,
    user: UserEntity,
    createAt: Date
}

/**
 * This interface use for add the item to the report.
 */
export interface DateItemReportInterface {
    totalNumberOfItem: number,
    avgSellPillPrice: number,
    avgBuyPillPrice: number,
    totalNumberOfAllItems: number,
    totalSellPrice: number,
    totalBuyPrice: number,
    avgProductionDate: Date,
    avgExpiryDate: Date
}

/**
 * This interface use for creating the item report.
 */
export interface ItemReportInterface {
    report: DateItemReportInterface,
    user: UserEntity,
    createAt: Date
}

/**
 * Swagger Interface for Doc the Controllers.
 */
export interface swaggerInterface {
    operation: ApiOperationOptions;
    responses: {
        success: ApiResponseOptions ,
        badRequest?: ApiResponseOptions,
        unauthorized?: ApiResponseOptions,
        forbidden?: ApiResponseOptions,
        notFound?: ApiResponseOptions,
    };
}