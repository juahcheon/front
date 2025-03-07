import date from "@/../public/icons/date2.svg";
import assignee from "@/../public/icons/people2.svg";
import useCardStore from "@/lib/store/choiceCard";
import useColorStore from "@/lib/store/mainColor";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

interface Card {
  item: {
    id: number;
    largeCatItemId: number;
    title: string;
    dueDate: string;
    assigneeName: string;
    statusName: string;
  };
  checklistId: number;
  onOpenModal?: (item: any) => void;
}

export default function Card({ item, checklistId, onOpenModal }: Card) {
  const { setChoiceCard } = useCardStore();
  const { color } = useColorStore();
  const statusName = item.statusName;
  const itemDate = item?.dueDate === "string" ? item.dueDate.split("T")[0] : "";

  const handleOpenModal = () => {
    onOpenModal?.(item);
  };

  const choice = () => {
    setChoiceCard(String(item.id));
  };

  return (
    <>
      <div
        className={item.statusName ? cn("cardWrap") : cn("cardWrapNone")}
        onClick={handleOpenModal}
      >
        <div
          className={cn("cardState", {
            cardState1: statusName === "시작전",
            cardState2: statusName === "진행중",
            cardState3: statusName === "완료",
          })}
        >
          {statusName}
        </div>

        <div className={cn("title")} onClick={choice}>
          {/* <div
            className={cn("colorTag")}
            style={{ border: `1px solid ${color}`, background: color }}
          ></div> */}
          <h3>{item.title}</h3>
        </div>
        <div className={cn("assignee")}>
          <Image src={assignee} alt="담당자" width={26} height={26} />
          <p>{item.assigneeName ? item.assigneeName : "담당자"}</p>
        </div>
        <div className={cn("date")}>
          <Image src={date} alt="날짜" width={26} height={26} />
          <p>{itemDate ? itemDate : "마감일자"}</p>
        </div>
      </div>
    </>
  );
}
