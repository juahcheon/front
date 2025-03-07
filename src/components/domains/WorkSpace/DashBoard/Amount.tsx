import classNames from "classnames/bind";
import styles from "@/pages/dashBoard/style.module.scss";
import Image, { StaticImageData } from "next/image";

import calenderIcon from "@/../public/icons/progress-calender.svg"
import weddingIcon from "@/../public/icons/progress-wedding.svg"
import lipstickIcon from "@/../public/icons/progress-lipstick.svg"
import airplaneIcon from "@/../public/icons/progress-airplane.svg"
import ringIcon from "@/../public/icons/progress-ring.svg"
import hanbokIcon from "@/../public/images/testImg.jpg"
import congratulationIcon from "@/../public/icons/progress-congratulations.svg"
import houseIcon from "@/../public/icons/progress-house.svg"
import defaultIcon2 from "@/../public/images/Workspace Logo.svg"

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
  const icons: Record<string, StaticImageData> = {
    '결혼 준비 시작': calenderIcon, 
    '웨딩홀': weddingIcon, 
    '스드메': lipstickIcon, 
    '신혼여행': airplaneIcon, 
    '예물/예단': ringIcon, 
    '예복/한복': hanbokIcon,
    '본식': congratulationIcon, 
    '신혼집': houseIcon
  };

  const defaultIcon: StaticImageData = defaultIcon2;

  const getCategoryIcon = (categoryTitle: string): StaticImageData => {
    return icons[categoryTitle] || defaultIcon;
  };

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
              src={getCategoryIcon(category.title)}
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