"use client"
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { useRouter } from "next/navigation";
import DateInput from "./DateInput";

// Campos obrigatórios
const formSchema = z.object({
    title: z.string({
        required_error: "Campo obrigatório.",
    }).trim().min(1, "Campo obrigatório."),

    description: z.string({
        required_error: "Campo obrigatório.",
    }).trim().min(1, "Campo obrigatório."),

    dates: z.object({
        start: z.string({
          required_error: "Campo obrigatório.",
        }).min(1, "Campo obrigatório."),
        end: z.string({
          required_error: "Campo obrigatório.",
        }).min(1, "Campo obrigatório."),
    }),

    locations: z.string({
        required_error: "Campo obrigatório.",
    }).trim().min(1, "Campo obrigatório."),

    participants: z.array(z.string()).min(1, "Pelo menos um participante é obrigatório."),
})

interface HPlansProps {
    defaultValues ?: z.infer<typeof formSchema>;
}

const HPlansForm = ({defaultValues}: HPlansProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        //router.push(`/barbershops?search=${data.title}`)
        //console.log(data.title)
    }
    

    return ( 
        <Form {...form}>
            <form className="flex w-full gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Input placeholder="Title..." {...field} />                            
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Input placeholder="Descriptions..." {...field} />                            
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dates"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <DateInput {...field} formMethods={form} placeholder="Dates..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="locations"
                    render={({field}) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Input placeholder="Locations..." {...field} />                            
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormControl>
                            <Input placeholder="Participants..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Button variant="default" type="submit">
                    Enviar
                </Button>
                </form>
        </Form>
    );
}
 
export default HPlansForm;