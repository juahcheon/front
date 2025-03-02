import classNames from "classnames/bind";
import styles from "@/pages/dashBoard/style.module.scss";
import Image from "next/image";

import calenderIcon from "@/../public/icons/progress-calender.svg"
import weddingIcon from "@/../public/icons/progress-wedding.svg"
import lipstickIcon from "@/../public/icons/progress-lipstick.svg"
import airplaneIcon from "@/../public/icons/progress-airplane.svg"
import ringIcon from "@/../public/icons/progress-ring.svg"
import congratulationIcon from "@/../public/icons/progress-congratulations.svg"
import houseIcon from "@/../public/icons/progress-house.svg"

const cn = classNames.bind(styles);

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

interface AmountProps {
  data: CategoryData[];
  setAmount: any;
  onOpenModal?: (item: any) => void;
}

export default function Amount({ data, setAmount, onOpenModal }: AmountProps) {
  const icons = [
    calenderIcon, 
    weddingIcon, 
    lipstickIcon, 
    airplaneIcon, 
    ringIcon, 
    congratulationIcon, 
    houseIcon
  ];

  const handleItemClick = (item: CategoryData) => {
    if (onOpenModal) {
      onOpenModal({
        ...item,
        smallCatItems: item.smallCatItems.map(catItem => {
          console.log("Small cat item:", catItem);
          return catItem;
        })
      });
    }
  };

  return (
    <div className={cn("amountWrap")}>
      <p>결혼 예산</p>
      <div className={cn("amountContents")}>
        <p>총 1억 3천 2백</p>
        <ul className={cn("amountUl")}>
        {data.map((category, index) => (
          <li key={category.id} onClick={() => handleItemClick(category)}>
            <Image 
              src={icons[index % icons.length]} 
              alt={category.title}
              width={50} 
              height={50} 
            />
            <div>
              <p>{category.title}</p>
              <span>원</span>
            </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  )
};