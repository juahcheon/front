import styles from "@/pages/workSpace/style.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

type SaveModalProps = {
  onClose: () => void;
  statusName: string;
};

export default function SaveModal({ onClose, statusName }: SaveModalProps) {
  
  return (
    <div className={cn("saveModalWrap")}>
      <div className={cn("saveModal")}>
        <p>
          플랜 완료!
          <br /> 준비가 착착 진행되고 있어요.
        </p>
        <button type="button" className={cn("saveModalBtn")} onClick={onClose}>
          수고했어요
        </button>
      </div>
    </div>
  );
}
