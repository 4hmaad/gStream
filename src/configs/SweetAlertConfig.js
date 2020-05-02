import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const alert = withReactContent(Swal)

const miniAlert = alert.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", alert.stopTimer)
    toast.addEventListener("mouseleave", alert.resumeTimer)
  }
})

export { miniAlert, alert }
