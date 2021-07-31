import ModalStyles from "../../styles/components/Modal.module.css";

const Modal = ({header="", main="", buttons=[]}) => {
  return (
  <div className={ModalStyles.wrap}>
      <div className={ModalStyles.modal}>
        <div className={ModalStyles.header}>
            {header}
        </div>
        <div className={ModalStyles.main}>
            {main}
        </div>
        <div className={ModalStyles.btnContainer}>
            {buttons.map(button=>(
                <button key={button} type="button" onClick={()=>button.onClick()}>{button.text}</button>
            ))}
        </div>
      </div>
  </div>);
};

export default Modal;
