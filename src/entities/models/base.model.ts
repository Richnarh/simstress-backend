import {BeforeInsert, PrimaryColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { EntityModel } from "./entity.model";

export abstract class BaseModel extends EntityModel{
    @PrimaryColumn()
    id: string;

    @BeforeInsert()
    generateUuid() {
        this.id = uuid4().replace(/-/g, '');
    }
}