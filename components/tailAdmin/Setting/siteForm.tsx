"use client";
import { revalidateSetting } from "@/app/api/revalidate.ts/route";
import { ParamsType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  key: z.string().min(2, "Key is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

type FormSchema = z.infer<typeof formSchema>;

function SiteForm({
  name,
  description,
  params,
  isUpdate = false,
}: {
  name: string;
  description: string;
  params: ParamsType;
  isUpdate?: boolean;
}) {
  const router = useRouter();
  const key = params.key;
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { key, description, name },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    if (isUpdate) {
      try {
        const res = await axios.put(`/api/setting/${key}`, {
          key: data.key,
          name: data.name,
          description: data.description,
        });
        revalidateSetting();
        router.push("/admin/site");

        // Handle successful response (e.g., redirect or show success message)
      } catch (error) {
        console.log("Error:", error);
        // Handle error (e.g., show error message)
      }
    } else {
      try {
        const res = await axios.post(`/api/setting/`, {
          key: data.key,
          name: data.name,
          description: data.description,
        });
        revalidateSetting();
        console.log("Response:", res.data);
        // Handle successful response (e.g., redirect or show success message)
      } catch (error) {
        console.log("Error:", error);
        // Handle error (e.g., show error message)
      }
    }

  };
  async function deleteHandler(){

    axios.delete(`http://localhost:3000/api/setting/${key}`)
    .then(response => {
      console.log(`${response}`);
      revalidateSetting()
      router.push("/admin/site/")
    })
    .catch(error => {
      console.error(error);
    });
  }  

  return (
    <div className="rounded-sm border border-stroke shadow-default bg-black/20">
      <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-6.5">
        <div className="mb-4">
          <label className="mb-3 block text-sm font-medium text-black">
            Key
          </label>
          <Controller
            name="key"
            control={control}
            defaultValue={key}
            render={({ field }) => (
              <input
                type="text"
                placeholder="Key"
                className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                {...field}
              />
            )}
          />
          {errors.key && (
            <div className="text-rose-800 mb-3 rounded-lg mt-1 max-w-fit">
              {errors.key.message}
            </div>
          )}
        </div>

        <div className="flex gap-3 w-full mb-4">
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black">
              Name
            </label>
            <Controller
              name={`name`}
              control={control}
              defaultValue={name}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <div className="text-rose-800 mb-3 rounded-lg mt-1 max-w-fit">
                {errors.name.message}
              </div>
            )}
          </div>
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black">
              Description
            </label>
            <Controller
              name={`description`}
              control={control}
              defaultValue={description}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="description"
                  className="w-full rounded-lg bg-white border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  {...field}
                />
              )}
            />
            {errors.description && (
              <div className="text-rose-800 mb-3 rounded-lg mt-1 max-w-fit">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-4">
          {isUpdate && (
            <button
              type="button"
              onClick={deleteHandler}
              className="flex rounded-md bg-rose-600 px-6 py-2 text-center font-medium text-white hover:bg-gray-300"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="flex rounded-md bg-black px-6 py-2 text-center font-medium text-white hover:bg-opacity-90"
            disabled={isSubmitting || !isDirty}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SiteForm;