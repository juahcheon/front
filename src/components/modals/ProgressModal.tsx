import arrow1 from "@/../public/icons/arrow1.svg";
import arrow2 from "@/../public/icons/arrow2.svg";
import arrow3 from "@/../public/icons/arrow3.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function ProgressModal({ item, onChange }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>(
    item.statusName || "시작전"
  );

  const handleStatusChange = (newProgress: "시작전" | "진행중" | "완료") => {
    setCurrentStatus(newProgress);
    onChange(newProgress);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className={cn(
          "progress",
          currentStatus === "시작전" && "before",
          currentStatus === "진행중" && "now",
          currentStatus === "완료" && "complete"
        )}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <p>{currentStatus}</p>
        {currentStatus === "시작전" ? (
          <Image
            src={arrow1}
            width={20}
            height={20}
            alt="화살표"
            className={cn("modalSpan")}
          />
        ) : currentStatus === "진행중" ? (
          <Image
            src={arrow2}
            width={20}
            height={20}
            alt="화살표"
            className={cn("modalSpan")}
          />
        ) : (
          <Image
            src={arrow3}
            width={20}
            height={20}
            alt="화살표"
            className={cn("modalSpan")}
          />
        )}
      </button>

      {isModalOpen && (
        <div>
          <ul className={cn("modalUL")}>
            {["시작전", "진행중", "완료"].map((statusName) => (
              <li key={statusName}>
                <button
                  className={cn(
                    "progress",
                    statusName === "시작전" && "before",
                    statusName === "진행중" && "now",
                    statusName === "완료" && "complete"
                  )}
                  onClick={() =>
                    handleStatusChange(
                      statusName as "시작전" | "진행중" | "완료"
                    )
                  }
                >
                  {statusName}
                  {/* <span className={cn("modalSpan")}>∨</span> */}
                  {statusName === "시작전" ? (
                    <Image
                      src={arrow1}
                      width={20}
                      height={20}
                      alt="화살표"
                      className={cn("modalSpan")}
                    />
                  ) : statusName === "진행중" ? (
                    <Image
                      src={arrow2}
                      width={20}
                      height={20}
                      alt="화살표"
                      className={cn("modalSpan")}
                    />
                  ) : (
                    <Image
                      src={arrow3}
                      width={20}
                      height={20}
                      alt="화살표"
                      className={cn("modalSpan")}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
