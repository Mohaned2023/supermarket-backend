import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';
import { UserEntity } from "src/auth/entities/user.entity";
import { ErrorEntitiy } from "src/error/entities/error.entity";
import { InvoiceEntity } from "src/invoice/entities/invoice.entity";
import { ItemEntity } from "src/item/entities/item.entity";
import { ReturnedInvoiceEntity } from "src/returned-invoice/entities/returned-invoice.entity";

const db = config.get('db') ;

export const typeormConfig: TypeOrmModuleOptions = {
    type: db.type ,
    host: db.host ,
    port: db.port ,
    username: db.username ,
    password: db.password ,
    database: db.database ,
    entities: [ UserEntity, ItemEntity, InvoiceEntity, ReturnedInvoiceEntity, ErrorEntitiy ],
    synchronize: db.synchronize
}
