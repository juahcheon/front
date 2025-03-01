import drop from "@/../public/icons/arrow.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import { Key, useState } from "react";
import Item from "./item";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function FilterShare({ item, func }: any) {
  const [dropState, setDropState] = useState<boolean>(false);

  const handleDrop = () => {
    setDropState((prev) => !prev);
  };

  return (
    <div>
      {/* filterTitle 부분 */}
      <div className={cn("filterTitle")}>
        <p>{item.title}</p>
        <Image
          src={drop}
          alt={item.title}
          width={20}
          height={20}
          onClick={handleDrop}
          style={{ transform: dropState ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      {/* filterWrap 리스트 */}
      <div>
        {item?.item?.map((item: any, index: Key | null | undefined) => (
          <div
            key={index}
            className={cn(dropState ? "filterWrapOff" : "filterWrap")}
          >
            <Item item={item} func={func} />
          </div>
        ))}
      </div>
    </div>
  );
}
