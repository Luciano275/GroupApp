'use client'

import { initialStateModal } from "@/components/providers/ModalProvider";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import ErrorMessage from "@/components/ui/form-error";
import { updateGroupAction } from "@/lib/actions";
import { ResponseGroupAction } from "@/types";
import React, { useState } from "react";
import { useLoading } from "@/components/providers/LoadingProvider";

export default function EditGroupForm(
  {group}
  :{
    group: {
      id: number;
      title: string;
      teacher: {
        name: string | null;
        email: string | null;
        image: string | null;
      };
    }
  }
) {
  
  const [groupName, setGroupName] = useState(group.title);
  const [state, setState] = useState<ResponseGroupAction>(initialStateModal)
  const { setLoading } = useLoading()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', groupName);

    setLoading(true);
    const results = await updateGroupAction(group.id, formData);

    setLoading(false);
    setState(results);
  }

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="group-name" className="block pb-2">
          Nombre del grupo
        </label>
        <input
          type="text"
          name="group-name"
          id="group-name"
          defaultValue={group.title}
          className="w-full bg-gray-900 p-2 rounded outline-none border border-transparent transition-colors focus:border-blue-500"
          placeholder="Título del grupo"
          onChange={(e) => setGroupName(e.target.value)}
          aria-describedby="group-edit-error-name"
        />

        <ErrorMessage
          state={state}
          id="group-edit-error-name"
          field="title"
        />
      </div>
      <button className="p-2 rounded bg-gray-700 hover:bg-gray-900">Guardar</button>
      
      <FormErrorMessage state={state} />
    </form>
  )
}