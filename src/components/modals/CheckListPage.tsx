import amount from "@/../public/icons/amount-icon.png";
import date from "@/../public/icons/date.svg";
import deleteIcon from "@/../public/icons/deleteRed.svg";
import detail from "@/../public/icons/detail-icon.png";
import assignee from "@/../public/icons/people.svg";
import { deleteItem } from "@/lib/apis/types/deleteItem";
import { UpdateItemPayload, updateItem } from "@/lib/apis/types/updateItem";
import { getItem } from "@/lib/apis/workSpace";
import { useWorkSpaceStore } from "@/lib/store/workSpaceData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ProgressModal from "./ProgressModal";
import TextEditor from "./TextEditor";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

type CheckListPageProps = {
  onClose: () => void;
  item: {
    checklistId: number;
    id: number;
    largeCatItemId: number;
    title: string;
    dueDate: string;
    assigneeName: string;
    body: string;
    statusName: string;
    amount: number;
    attachedFileUrl?: string;
  };
  ids: {
    checklistId?: number;
    largeCatItemId?: number;
    smallCatItemId?: number;
  };
  onDeleteSuccess: () => void;
  onShowSaveModal: (statusName: string) => void;
};

export default function CheckListPage({
  onClose,
  item,
  ids,
  onDeleteSuccess,
  onShowSaveModal,
}: CheckListPageProps) {
  const { selectedItem, setSelectedItem } = useWorkSpaceStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [cardId, setCardId] = useState<number>(1);
  const [cardLength, setCardLength] = useState<number>(0);
  const today = new Date().toISOString().split("T")[0];
  const displayAmount = item.amount ? item.amount / 10000 : 0;

  const [formData, setFormData] = React.useState({
    title: item.title || "",
    dueDate: item.dueDate || "",
    assigneeName: item.assigneeName || "신부",
    body: item.body || "",
    statusName: item.statusName || "진행 중",
    amount: displayAmount,
    attachedFileUrl: item.attachedFileUrl || "",
  });

  const {
    data: smallCatData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "smallCatData",
      ids.checklistId,
      ids.largeCatItemId,
      ids.smallCatItemId,
    ],
    queryFn: () =>
      getItem(ids.checklistId, ids.largeCatItemId, ids.smallCatItemId),
    enabled: !!ids.checklistId && !!ids.largeCatItemId && !!ids.smallCatItemId,
  });

  const { mutate: updateItemMutate, isPending: isUpdating } = useMutation({
    mutationFn: (payload: UpdateItemPayload) => {
      if (
        payload.attachedFileUrl &&
        payload.attachedFileUrl.includes(".data:")
      ) {
        console.log(
          "여러 파일이 감지되었습니다. 파일 개수:",
          payload.attachedFileUrl
            .split(".")
            .filter((url) => url.startsWith("data:")).length
        );
      }
      return updateItem(payload);
    },
    onSuccess: async (data, variables) => {
      const displayAmount = variables.amount / 10000;
      queryClient.setQueryData(
        [
          "smallCatData",
          ids.checklistId,
          ids.largeCatItemId,
          ids.smallCatItemId,
        ],
        (oldData: any) => ({
          ...oldData,
          ...variables,
        })
      );
      await queryClient.invalidateQueries({
        queryKey: ["cardData", cardId, cardLength],
      });

      if (selectedItem && selectedItem.id === variables.id) {
        const updatedItem = {
          ...selectedItem,
          title: variables.title,
          dueDate: variables.dueDate,
          assigneeName: variables.assigneeName,
          statusName: variables.statusName,
          body: variables.body,
          amount: variables.amount,
          attachedFileUrl: variables.attachedFileUrl || "",
        };
        const isImageAttachment =
          variables.attachedFileUrl &&
          variables.attachedFileUrl.startsWith("data:image/");

        if (!isImageAttachment) {
          (updatedItem as any).attachedFileUrl = variables.attachedFileUrl;
        }

        setSelectedItem(updatedItem);
      }

      setFormData({
        title: variables.title,
        dueDate: variables.dueDate,
        assigneeName: variables.assigneeName,
        body: variables.body || "",
        statusName: variables.statusName,
        amount: displayAmount,
        attachedFileUrl: variables.attachedFileUrl || "",
      });

      if (variables.statusName === "완료") {
        onShowSaveModal(variables.statusName);
      } else {
        setCardLength((prev) => prev + 1);
      }
    },
    onError: (error: Error) => {
      console.error("에러 발생:", error);
      alert("수정 중 오류가 발생했습니다.");
    },
  });

  const { mutate: deleteItemMutate } = useMutation({
    mutationFn: () => {
      if (!ids.checklistId || !ids.largeCatItemId || !ids.smallCatItemId) {
        throw new Error("ids가 없습니다");
      }

      return deleteItem(
        ids.checklistId,
        ids.largeCatItemId,
        ids.smallCatItemId
      );
    },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: [
          "smallCatData",
          ids.checklistId,
          ids.largeCatItemId,
          ids.smallCatItemId,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["cardData"],
      });
      onDeleteSuccess();
      alert("성공적으로 삭제되었습니다.");
      onClose();
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  useEffect(() => {
    if (smallCatData) {
      console.log("Loaded small cat data:", smallCatData);

      const displayAmount = smallCatData.amount
        ? smallCatData.amount / 10000
        : 0;

      setFormData({
        title: smallCatData.title || item.title || "",
        dueDate: smallCatData.dueDate || item.dueDate || "",
        assigneeName: smallCatData.assigneeName || item.assigneeName || "신부",
        body: smallCatData.body || item.body || "",
        statusName: smallCatData.statusName || item.statusName || "진행 중",
        amount: displayAmount,
        attachedFileUrl:
          smallCatData.attachedFileUrl || item.attachedFileUrl || "",
      });
    }
  }, [smallCatData, item]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (fileUrl: string, isNewFile: boolean = true) => {
    setFormData((prev) => {
      if (fileUrl === "") {
        return {
          ...prev,
          attachedFileUrl: "",
        };
      } else if (isNewFile) {
        const existingUrl = prev.attachedFileUrl || "";
        const newAttachedFileUrl = existingUrl
          ? `${existingUrl}.${fileUrl}`
          : fileUrl;

        return {
          ...prev,
          attachedFileUrl: newAttachedFileUrl,
        };
      } else {
        return {
          ...prev,
          attachedFileUrl: fileUrl,
        };
      }
    });
  };

  const handleProgressChange = (newStatus: string) => {
    setFormData((prev) => ({
      ...prev,
      statusName: newStatus,
    }));
  };

  const handleDelete = () => {
    if (!ids.checklistId || !ids.largeCatItemId || !ids.smallCatItemId) {
      alert("삭제할 항목의 필수 데이터가 없습니다.");
      return;
    }

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      deleteItemMutate();
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ids.checklistId || !ids.largeCatItemId || !ids.smallCatItemId) {
      alert("필수 데이터가 누락되었습니다.");
      console.log(ids.checklistId, ids.largeCatItemId, ids.smallCatItemId);
      return;
    }

    const serverAmount = Number(formData.amount) * 10000;

    if (formData.attachedFileUrl) {
      const fileUrls = formData.attachedFileUrl.split(".");
      for (const url of fileUrls) {
        if (url.startsWith("data:")) {
          const sizeInKB = Math.round(url.length / 1024);
          console.log(`첨부 파일 크기: ${sizeInKB}KB`);

          // 경고: 1MB 이상이면 경고 표시
          if (sizeInKB > 1024) {
            console.warn(`첨부 파일 크기가 큽니다: ${sizeInKB}KB`);
          }
        }
      }
    }

    const payload: UpdateItemPayload = {
      checklistId: ids.checklistId,
      id: ids.smallCatItemId,
      largeCatItemId: ids.largeCatItemId,
      title: formData.title,
      dueDate: formData.dueDate || new Date().toISOString().split("T")[0],
      assigneeName: formData.assigneeName,
      body: formData.body || "",
      statusName: formData.statusName,
      amount: serverAmount,
      attachedFileUrl: formData.attachedFileUrl || "",
    };

    setFormData((prev) => ({
      ...prev,
      title: formData.title,
      dueDate: formData.dueDate || new Date().toISOString().split("T")[0],
      assigneeName: formData.assigneeName,
      body: formData.body || "",
      statusName: formData.statusName,
    }));
    updateItemMutate(payload);
  };

  return (
    <div className={cn("checkModalWrap")} ref={modalRef}>
      <div className={cn("modalNav")}>
        <button onClick={onClose}>→</button>
        <button className={cn("trashIcon")} onClick={handleDelete}>
          <Image
            src={deleteIcon}
            alt="소분류 삭제하기"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className={cn("modalContents")}>
        <ProgressModal item={item} onChange={handleProgressChange} />
        <form className={cn("modalForm")} onSubmit={handleSave}>
          <div className={cn("formFlex")}>
            <h2>
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="제목을 입력하세요."
                onChange={handleChange}
              />
            </h2>
            <div className={cn("assignee", "label")}>
              <Image src={assignee} alt="담당자" width={20} height={20} />
              <p>담당자</p>
            </div>
            <div className={cn("people")}>
              <button
                type="button"
                className={cn("assigneeBtn", {
                  active: formData.assigneeName === "신랑",
                })}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, assigneeName: "신랑" }))
                }
              >
                신랑
              </button>
              <button
                type="button"
                className={cn("assigneeBtn", {
                  active: formData.assigneeName === "신부",
                })}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, assigneeName: "신부" }))
                }
              >
                신부
              </button>
            </div>
            <div className={cn("date", "label")}>
              <Image src={date} alt="날짜" width={20} height={20} />
              <input
                type="date"
                onChange={handleChange}
                value={formData.dueDate}
                name="dueDate"
                placeholder="날짜를 선택하세요."
                min={today}
              />
            </div>
            <div className={cn("amount", "label")}>
              <Image src={amount} alt="금액" width={22} height={22} />
              <input
                type="number"
                onChange={handleChange}
                value={formData.amount}
                name="amount"
              />
              <span>만원</span>
            </div>
          </div>
          <div className={cn("detail", "label")}>
            <div className={cn("modalDetail")}>
              <div className={cn("detailIcon")}>
                <Image
                  className={cn("detailIconMargin")}
                  src={detail}
                  alt="내용"
                  width={20}
                  height={20}
                />
                <p>내용</p>
              </div>
              <TextEditor
                content={formData.body}
                onContentChange={(newContent: any) =>
                  setFormData((prev) => ({ ...prev, body: newContent }))
                }
                onFileUpload={handleFileUpload}
                item={item}
              />
            </div>
            <div className={cn("modalFooter")}>
              <button
                type="submit"
                className={cn("saveBtn")}
                disabled={isUpdating}
              >
                {isUpdating ? "저장 중..." : "저장하기"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
