import { dataFormSchema } from "@/app/types/zod";

export type ItemProps = {    
    data: dataFormSchema;
    onDelete: () => void;
    onEdit: (updatedItem: dataFormSchema) => void;
}