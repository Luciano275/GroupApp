import { ApiNotificationsResponse, ReactQueryNotificationsResponse } from "@/types";
import { InfiniteData } from "@tanstack/react-query";

export const generateRandomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const code = Array.from({ length: 8 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');

  return code;
}

export function tiempoTranscurrido(desde: string) {
  const ahora = new Date()
  const diferenciaMs = ahora.getTime() - new Date(desde).getTime();
  const diferenciaSeg = Math.round(diferenciaMs / 1000);
  const diferenciaMin = Math.round(diferenciaSeg / 60);
  const diferenciaHora = Math.round(diferenciaMin / 60);
  const diferenciaDia = Math.round(diferenciaHora / 24);
  const diferenciaMes = Math.round(diferenciaDia / 30);
  const diferenciaAnio = Math.round(diferenciaMes / 12);

  if (diferenciaAnio > 0) {
    return `Hace ${diferenciaAnio} año${diferenciaAnio > 1 ? 's' : ''}`;
  } else if (diferenciaMes > 0) {
    return `Hace ${diferenciaMes} mes${diferenciaMes > 1 ? 'es' : ''}`;
  } else if (diferenciaDia > 0) {
    return `Hace ${diferenciaDia} día${diferenciaDia > 1 ? 's' : ''}`;
  } else if (diferenciaHora > 0) {
    return `Hace ${diferenciaHora} hora${diferenciaHora > 1 ? 's' : ''}`;
  } else if (diferenciaMin > 0) {
    return `Hace ${diferenciaMin} minuto${diferenciaMin > 1 ? 's' : ''}`;
  } else {
    return `Hace unos segundos`;
  }
}

export const getTotalNotifications = (data: InfiniteData<ApiNotificationsResponse, unknown> | undefined) => {
  if (data && data.pages) {
    const lengths = [...data.pages.map(({notifications}) => notifications.length)]

    return lengths.reduce((a,b) => a+b, 0)
  }
  return null;
}