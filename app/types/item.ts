import { dataFormSchema } from "@/app/types/zod";

export type ItemProps = {
    id: string;
    date: Date;    
    data: dataFormSchema;
    onDelete: () => void;
    onEdit: (updatedItem: dataFormSchema) => void;
}