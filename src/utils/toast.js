import Swal from "sweetalert2";
export const showToast = (type, message) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: "#1f2937", // dark bg
    color: "#fff",
    showClass: {
      popup: "animate__animated animate__fadeInRight",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutRight",
    },
  });
};
//----------------------------------------
/* 

export const showToast = (type, message) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: type, // success | error | warning | info
    title: message,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
}; */