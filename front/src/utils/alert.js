import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const classes = {
    container: `swal-container`,
    popup: `swal-popup`,
};

const success = (text, title, confirmCallback, cancelCallback) => {
    const successSwal = withReactContent(Swal);

    return successSwal
        .fire({
            allowOutsideClick: false,
            showCloseButton: false,
            customClass: classes,
            confirmButtonText: `Aceptar`,
            confirmButtonClass: `btn-crea`,
            title: title ?? `¡Tu pedido se ha realizado con éxito!`,
            html: text,
            icon: `success`,
        })
        .then((result) => {
            if (result.isConfirmed) {
                if (confirmCallback) {
                    confirmCallback();
                }
            } else if (result.isDenied || result.isDismissed) {
                if (cancelCallback) {
                    cancelCallback();
                }
            }
        });
};

const danger = (text, confirmCallback, cancelCallback) => {
    const dangerSwal = withReactContent(Swal);

    return dangerSwal
        .fire({
            allowOutsideClick: false,
            showCloseButton: false,
            customClass: classes,
            confirmButtonText: `Aceptar`,
            confirmButtonClass: `btn-crea`,
            title: `Oops...`,
            html: text,
            icon: `error`,
        })
        .then((result) => {
            if (result.isConfirmed) {
                if (confirmCallback) {
                    confirmCallback();
                }
            } else if (result.isDenied || result.isDismissed) {
                if (cancelCallback) {
                    cancelCallback();
                }
            }
        });
};

const confirmation = (title, text, confirmCallback, cancelCallback) => {
    const dangerSwal = withReactContent(Swal);

    return dangerSwal
        .fire({
            allowOutsideClick: false,
            showCloseButton: false,
            showCancelButton: true,
            reverseButtons: true,
            customClass: classes,
            confirmButtonText: `Aceptar`,
            confirmButtonClass: `btn-crea`,
            cancelButtonText: `Cancelar`,
            cancelButtonClass: `btn-crea-danger`,
            title,
            html: text,
            icon: `warning`,
        })
        .then((result) => {
            if (result.isConfirmed) {
                if (confirmCallback) {
                    confirmCallback();
                }
            } else if (result.isDenied || result.isDismissed) {
                if (cancelCallback) {
                    cancelCallback();
                }
            }
        });
};

const alerts = {
    success,
    danger,
    confirmation,
};

export default alerts;
