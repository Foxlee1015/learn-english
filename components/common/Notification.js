import { useEffect, useState } from "react";
import NotificationStyles from "../../styles/components/common/Notification.module.css";

const Notification = ({ text, open, setOpen }) => {
  const [timerId, setTimerId] = useState(null)
  const timer = () => setTimeout(() => setOpen(false), 3500);
    
  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId)
    }
    if (open) {
      setTimerId(timer());
    }
  }, [text, open]);
  

  return (
    <>
      {text && (
        <div className={NotificationStyles.outter}>
        <div
          className={`${NotificationStyles.inner} ${
            open && NotificationStyles.open
          }`}
        >
          <p className={NotificationStyles.text}>{text}</p>
        </div>
        </div>
      )}
    </>
  );
};

export default Notification;
