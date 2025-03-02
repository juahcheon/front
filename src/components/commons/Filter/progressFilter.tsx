import drop from "@/../public/icons/arrow.svg";
import useFilterStore from "@/lib/store/filter";
import classNames from "classnames/bind";
import Image from "next/image";
import { Key, useEffect, useState } from "react";
import ProgressItem from "./progressItem";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function ProgressFilter({ item, status }: any) {
  const [dropState, setDropState] = useState<boolean>(false);
  const { filterBox, setFilterBox } = useFilterStore();

  const handleDrop = () => {
    setDropState((prev) => !prev);
  };

  const handleProgressStatusChange = (
    newStatus: "시작전" | "진행중" | "완료"
  ) => {
    setFilterBox({
      category: filterBox.category,
      progressStatus: filterBox.progressStatus === newStatus ? "" : newStatus,
      assignee: [],
    });
  };
  useEffect(() => {
    if (status) {
      setDropState(true);
    }
  }, []);
  return (
    <div>
      {/* filterTitle 부분 */}
      <div className={cn("filterTitle")} onClick={handleDrop}>
        <p>{item.title}</p>
        <Image
          src={drop}
          alt={item.title}
          width={20}
          height={20}
          style={{ transform: dropState ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      {/* filterWrap 리스트 */}
      <div className={cn(dropState ? "filterMoOff" : "filterMo")}>
        {item?.item?.map((item: any, index: Key | null | undefined) => (
          <div
            key={index}
            className={cn(dropState ? "filterWrapOff" : "filterWrap")}
          >
            <ProgressItem
              item={item}
              func={handleProgressStatusChange}
              selectedStatus={filterBox.progressStatus}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
