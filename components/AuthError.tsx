'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CiWarning } from "react-icons/ci";

export default function AuthError() {

  const params = useSearchParams();
  const errorMsg = params.get('error') === 'OAuthAccountNotLinked' ? 'Ya existe un email registrado con otro proveedor' : null

  const [ error, setError ] = useState<string | null>(errorMsg)

  if (error) {
    return (
      <p className="bg-red-500 bg-opacity-30 w-fit rounded text-center p-3 flex gap-x-2 mx-auto">
        <CiWarning size={25} />
        {error}
      </p>
    )
  }
}