'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AuthError() {

  const params = useSearchParams();
  const errorMsg = params.get('error') === 'OAuthAccountNotLinked' ? 'Ya existe un email registrado con otro provider' : null

  const [ error, setError ] = useState<string | null>(errorMsg)

  if (error) {
    return (
      <p className="text-red-600 text-center py-5 px-2">
        {error}
      </p>
    )
  }
}