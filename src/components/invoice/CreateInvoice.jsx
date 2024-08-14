"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import ActionModel from "../widgets/ActionModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { LoadingButton } from "../widgets/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const customers = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.pravatar.cc/300?u=a042581f4e29026702d",
    email: "ahamedmaxz125@gmail.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    image: "https://i.pravatar.cc/300?u=a042581f4e29026703d",
    email: "ahamedmaxz125@gmail.com",
  },
  {
    id: 3,
    name: "John Cena",
    image: "https://i.pravatar.cc/300?u=a042581f4e29026700d",
    email: "ahamedmaxz125@gmail.com",
  },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required.",
  }),
  status: z.string().min(2, {
    message: "Status is required.",
  }),
  amount: z.string().min(2, {
    message: "Amount is required.",
  }),
});

export default function CreateInvoice() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searcParams = useSearchParams();
  const id = searcParams.get("id");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      status: "Unpaid",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values) {
    const { name, amount, status } = values;
    const customer = customers.find((c) => c.name === name);

    const formData = {
      amount,
      customer,
      status,
      id: id ? id : "",
    };

    if (id) {
      // Update
      const res = await fetch("/api/update", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log(result);
      if (result?.error) {
        toast.error(result?.error);
      }
      if (result?.message) {
        toast.success(result?.message);
      }
      form.reset();
      setOpen(false);
    } else {
      // Create
      const res = await fetch("/api/actions", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result?.error) {
        toast.error(result?.error);
      }
      if (result?.message) {
        toast.success(result?.message);
      }
      form.reset();
      setOpen(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setOpen(true);
        try {
          const res = await fetch(`/api/update/?id=${id}`);
          const result = await res.json();

          const invoice = await result?.data;

          form.setValue("name", invoice?.customer?.name);
          form.setValue("amount", invoice?.amount);
          form.setValue("status", invoice?.status);
          console.log(invoice);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  // Reset the url after closing edit popup
  useEffect(() => {
    if (!open) {
      router.replace("/");
    }
  }, [open, router]);
  return (
    <div>
      <ActionModel
        title="Create Invoice"
        desc="Create new invoice"
        trigger={
          <Button className="text-white space-x-1">
            <span>Create Invoice</span>
            <span className="text-lg">+</span>
          </Button>
        }
        open={open}
        setOpen={setOpen}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3"
          >
            {/* Select Customer */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Customer</SelectLabel>
                        {customers?.map((item, index) => (
                          <SelectItem key={index} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Amount Input */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Radio Group */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      value={field.value}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Unpaid" />
                        </FormControl>
                        <FormLabel className="font-normal">Unpaid</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Paid" />
                        </FormControl>
                        <FormLabel className="font-normal">Paid</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading ? (
              <LoadingButton
                btnText={"Loading"}
                btnClass="w-full"
                btnVariant={"outline"}
              />
            ) : (
              <Button className="w-full" type="submit">
                {id ? "Update Invoice" : "Create Invoice"}
              </Button>
            )}
          </form>
        </Form>
      </ActionModel>
    </div>
  );
}
