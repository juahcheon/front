import classNames from "classnames/bind";
import styles from "@/pages/workSpace/style.module.scss";
import Image from "next/image";
import icon from "@/../public/icons/alert-icon.gif"

const cn = classNames.bind(styles);

type SaveModalProps = {
  onClose: () => void
}

export default function SaveModal({ onClose }:SaveModalProps) {

  return (
    <div className={cn("saveModalWrap")}>
      <div className={cn("saveModal")}>
        <p>체킹 완료!
          <br /> 결혼 준비 고수가 되어가고 있어요
        </p>
        <button type="button" className={cn("saveModalBtn")} onClick={onClose}>확인</button>
      </div>
    </div>
  )
};