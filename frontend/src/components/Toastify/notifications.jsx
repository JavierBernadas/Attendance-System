import { toast } from "react-toastify";


export function notifySuccess(meesage) {
  toast.success(` ${meesage} `, {
    position: "bottom-right",
   autoClose: 5001,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
    
}

export function notifyError(meesage) {
  toast.error(` ${meesage} `, {
    position: "bottom-right",
   autoClose: 5001,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
    
}


