import { ItemService } from './item.service';
export declare class ItemController {
    private service;
    constructor(service: ItemService);
    create(safeid: string, data: string): Promise<{
        message: string;
        item: import(".prisma/client").Item;
    }>;
    edit(id: string, data: string): Promise<{
        message: string;
        item: import(".prisma/client").Item;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
