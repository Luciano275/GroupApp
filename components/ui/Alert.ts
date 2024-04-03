import Swal from 'sweetalert2'

export const QuestionAlert = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no tiene vuelta atrás",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    background: "#222",
    color: '#fff'
  }).then(async (result) => {
    return result.isConfirmed;
  });

  return result;
}