import classNames from "classnames/bind";
import styles from "@/pages/dashBoard/style.module.scss";


const cn = classNames.bind(styles);

export default function Progress() {

  return (
    <div className={cn("progressWrap")}>
      <p>진행 현황</p>
      <div className={cn("progressContents")}>
        <div>
          <p>전체 일정</p>
          <span>20개</span>
        </div>
        <div>
          <p>완료 일정</p>
          <span>3개</span>
        </div>
        <div>
          <p>마감일 지난 일정</p>
          <span>50개</span>
        </div>
        <div>
          <p>진행중 일정</p>
          <span>1개</span>
        </div>
        <div>
          <p>시작전 일정</p>
          <span>2개</span>
        </div>
      </div>
    </div>
  )
};