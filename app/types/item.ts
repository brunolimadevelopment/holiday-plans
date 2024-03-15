import { DataFormSchemaType } from "@/app/types/zod";

export type ItemProps = {   
    data: DataFormSchemaType;
    onDelete: () => void;
    onEdit: (updatedItem: DataFormSchemaType) => void;
}