"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import api, { AxiosError } from 'axios'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "../ui/use-toast"
import { FormLeadSchema } from "@/utils/schemas/FormLeadSchema"

export function FormLead() {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormLeadSchema>>({
        resolver: zodResolver(FormLeadSchema),
        defaultValues: {
            name: "",
            email: "",
            telefone: ""
        },
    })

    async function onSubmit(data: z.infer<typeof FormLeadSchema>) {
        try {
            const response = await api.post("/api/leads", data);

            if (response.status === 201) {
                toast({
                    title: "Lead criado com sucesso!",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(response.data.newLead, null, 2)}</code>
                        </pre>
                    ),
                });
                form.reset()
            }
        } catch (error: any) {
            if (error instanceof AxiosError) {
                toast({
                    title: "Erro",
                    description: error?.response?.data.message,
                });
            } else {
                toast({
                    title: "Erro",
                    description: "Algo deu errado. Tente novamente mais tarde.",
                });
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input placeholder="Telefone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Envia</Button>
            </form>
        </Form>
    )
}
