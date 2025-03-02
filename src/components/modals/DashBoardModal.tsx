import styles from "@/pages/dashBoard/style.module.scss"
import classNames from "classnames/bind"
import Image from "next/image";
import { useEffect } from "react";

import calenderIcon from "@/../public/icons/progress-calender.svg"
import weddingIcon from "@/../public/icons/progress-wedding.svg"
import lipstickIcon from "@/../public/icons/progress-lipstick.svg"
import airplaneIcon from "@/../public/icons/progress-airplane.svg"
import ringIcon from "@/../public/icons/progress-ring.svg"
import congratulationIcon from "@/../public/icons/progress-congratulations.svg"
import houseIcon from "@/../public/icons/progress-house.svg"

const cn = classNames.bind(styles);

interface DashBoarModalProps {
  data: CategoryData;
  isOpen: boolean;
  onClose: () => void;
}

interface SmallCatItem {
  id: number;
  largeCatItemId: number;
  title: string;
  dueDate: string;
  assigneeName: string;
  statusName: string;
  attachedFileUrl: string;
  amount?: number;
}

interface CategoryData {
  id: number;
  checklistId: number;
  title: string;
  smallCatItems: SmallCatItem[];
}

export default function DashBoardModal({ data, isOpen, onClose }: DashBoarModalProps) {
  const icons = [
    calenderIcon, 
    weddingIcon, 
    lipstickIcon, 
    airplaneIcon, 
    ringIcon, 
    congratulationIcon, 
    houseIcon
  ];
  const iconIndex = (data.id || 0) % icons.length;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  return(
    <div className={cn("dashBoardModalWrap")} onClick={handleBackdropClick}>
      <div className={cn("dashBoardModalContents")}>
        <div className={cn("modalGNB")}>
          <p>{data.title}</p>
          <button type="button" className={cn("modalCloseBtn")} onClick={onClose}>ⅹ</button>
        </div>
        <div className={cn("modalGNBImg")} >
          <Image src={icons[iconIndex]} alt={data.title || "Category icon"} width={500} height={240}  />
        </div>
        <ul className={cn("dashBoardModalUl")}>
          {data.smallCatItems && data.smallCatItems.map((item, index) => (
            <li key={item.id}>
              <p>{index+1}</p>
              <span>{item.title}</span>
              <span className={cn("modalAmount")}>{item.amount ? `${item.amount}원` : "0원"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
};