import {ReactNode} from "react"
import "./Modal.css";

interface ModalType {
  children?: ReactNode
  isOpen: boolean
  toggle: () => void
}

const Modal = ({ children, isOpen, toggle }: ModalType) => {
  const handleModalContainerClick = (e: any) => e.stopPropagation();

  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={toggle}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={toggle}>
          X
        </button>
        {children}
      </div>
    </article>
  );
};

export default Modal