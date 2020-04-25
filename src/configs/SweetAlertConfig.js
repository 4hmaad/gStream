import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const model = withReactContent(Swal)

const alert = model.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", model.stopTimer)
    toast.addEventListener("mouseleave", model.resumeTimer)
  },
})

export { model, alert }
