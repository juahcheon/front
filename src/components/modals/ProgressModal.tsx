import classNames from "classnames/bind";
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
        <span>∨</span>
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
                  <span className={cn("modalSpan")}>∨</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
