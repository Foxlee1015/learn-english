import { useEffect } from "react";
import NotificationStyles from "../../styles/components/common/Notification.module.css";

const Notification = ({ text, open, setOpen }) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => setOpen(false), 3500);
    }
  }, [open]);

  return (
    <>
      {text && (
        <div
          className={`${NotificationStyles.container} ${
            open && NotificationStyles.containerOpen
          }`}
        >
          <p className={NotificationStyles.text}>{text}</p>
        </div>
      )}
    </>
  );
};

export default Notification;
