'use server';

import { signIn, signOut } from "@/auth";
import { TypeModal } from "@/components/providers/ModalProvider";
import { DEFAULT_REDIRECT } from "@/routes";
import { ResponseGroupAction } from "@/types";
import { z } from 'zod'
import { createGroup, deleteGroup, fetchGroupByCode, fetchMyGroups, joinToGroup, skorsMember, updateGroup } from "./data";
import { revalidatePath } from "next/cache";
import { generateRandomCode } from "./utils";

const GroupSchema = z.object({
  title: z.string({
    invalid_type_error: 'Ingresa un tipo válido'
  }).min(1, 'Ingresa un título para el grupo'),
  code: z.string({
    invalid_type_error: 'Ingresa un código válido'
  }).min(6, 'Ingresa un código de al menos 6 caracteres')
})

export async function loginAction (provider: 'google' | 'github' = 'google') {
  await signIn(provider, {
    redirect: true,
    redirectTo: DEFAULT_REDIRECT
  })
}

export async function logoutAction() {
  await signOut({
    redirect: true,
    redirectTo: DEFAULT_REDIRECT
  })
}

export async function createGroupAction(formData: FormData, userId: string): Promise<ResponseGroupAction> {

  const data = Object.fromEntries(formData.entries())

  const parsedData = GroupSchema.omit({code: true}).safeParse(data)

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Completa los campos para crear el grupo",
      success: false
    }
  }

  const { title } = parsedData.data;

  try {

    const validate = async (): Promise<string> => {

      const code = generateRandomCode()

      const repetedCode = await fetchGroupByCode(code)

      if (repetedCode) {
        return validate()
      }else {
        
        await createGroup({
          title,
          code,
          userId
        })

        return code;
      }
    }

    const yourCode = await validate()

    revalidatePath('/groups')

    return {
      message: `Tu codigo del grupo es: ${yourCode}`,
      success: true
    }

  }catch (e) {
    console.error(e);
    return {
      message: 'Fallo al crear el grupo',
      success: false
    }
  }
}

export async function joinToGroupAction(code: string, userId: string): Promise<ResponseGroupAction> {
  const parsedData = GroupSchema.omit({title: true}).safeParse({code});

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Completa el campo para unirte al grupo',
      success: false
    }
  }

  const { code: groupCode } = parsedData.data;

  try {

    const results = await fetchMyGroups(userId);
    const group = await fetchGroupByCode(groupCode)

    if (!group) {
      return {
        message: 'El grupo no existe',
        success: false
      }
    }

    const groupAlreadyExists = results.some(({ code }) => code === groupCode);

    if (groupAlreadyExists) {
      return {
        message: 'Ya estás en ese grupo',
        success: false
      }
    }

    await joinToGroup(userId, group.id);

    revalidatePath('/groups')

    return {
      message: `Ahora eres miembro del grupo "${group.title}"`,
      success: true
    }

  }catch (e) {
    console.error(e);
    return {
      message: 'Fallo al unirte al grupo',
      success: false
    }
  }
}

export async function deleteGroupAction(groupId: string): Promise<ResponseGroupAction> {
  try {
    
    await deleteGroup(groupId)

  }catch (e) {
    console.error(e);
    return {
      message: 'Fallo al eliminar el grupo',
      success: false
    }
  }

  revalidatePath('/groups')

  return {
    message: 'El grupo ha sido eliminado',
    success: true
  }
}

export async function updateGroupAction(id: number, formData: FormData): Promise<ResponseGroupAction>{
  const parsedData = GroupSchema.omit({code: true}).safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: 'Completa el campo para actualizar el grupo',
      success: false
    }
  }

  const { title } = parsedData.data;

  try {
    await updateGroup(id, title);
  }catch (e) {
    console.error(e);
    return {
      message: 'Fallo al actualizar el grupo',
      success: false
    }
  }

  revalidatePath('/groups');

  return {
    message: 'El grupo ha sido actualizado!',
    success: true
  }
}

export async function skorsMemberAction(memberId: number, ownerId: string, groupId: number): Promise<ResponseGroupAction> {

  try {
    await skorsMember(memberId, ownerId, groupId);
  }catch (e) {
    console.error(e)
    return {
      message: 'Fallo al expulsar al usuario',
      success: false
    }
  }

  revalidatePath('/groups/[id]/members', 'page')

  return {
    message: 'El miembro ha sido expulsado',
    success: true
  }
}