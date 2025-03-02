import amount from "@/../public/icons/amount-icon.png";
import date from "@/../public/icons/date.svg";
import deleteIcon from "@/../public/icons/deleteRed.svg";
import detail from "@/../public/icons/detail-icon.png";
import assignee from "@/../public/icons/people.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import ProgressModal from "./ProgressModal";
import styles from "./style.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "@/lib/apis/types/deleteItem";
import React, { useEffect, useRef, useState } from "react";
import { updateItem, UpdateItemPayload } from "@/lib/apis/types/updateItem";
import { useWorkSpaceStore } from "@/lib/store/workSpaceData";
import { getItem } from "@/lib/apis/workSpace";
import TextEditor from "./TextEditor";

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
  }
  onDeleteSuccess: () => void;
  onShowSaveModal: () => void;
};

export default function CheckListPage({ onClose, item, ids, onDeleteSuccess, onShowSaveModal }: CheckListPageProps) {
  const { selectedItem, setSelectedItem } = useWorkSpaceStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [ cardId, setCardId ] = useState<number>(1);
  const [ cardLength, setCardLength ] = useState<number>(0);
  const today = new Date().toISOString().split('T')[0];
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

  
  const { data: smallCatData, isLoading, refetch } = useQuery({
    queryKey: ["smallCatData", ids.checklistId, ids.largeCatItemId, ids.smallCatItemId],
    queryFn: () => getItem(
      ids.checklistId, ids.largeCatItemId, ids.smallCatItemId
    ),
    enabled: !!ids.checklistId && !!ids.largeCatItemId && !!ids.smallCatItemId,
  });

  const { mutate: updateItemMutate, isPending: isUpdating } = useMutation({
    mutationFn: (payload: UpdateItemPayload) => {
      const isImageData = payload.attachedFileUrl && 
      payload.attachedFileUrl.startsWith('data:image/');
      if (isImageData) {
        console.log("이미지 데이터 감지됨, 특수 처리 적용");
        
        const modifiedPayload = {
          ...payload,
          attachedFileUrl: ""
        };
        return updateItem(modifiedPayload);
      }
      return updateItem(payload);
    },
    onSuccess: async (data, variables) => {
      const displayAmount = variables.amount / 10000;
      queryClient.setQueryData(
        ["smallCatData", ids.checklistId, ids.largeCatItemId, ids.smallCatItemId], 
        (oldData: any) => ({
          ...oldData,
          ...variables
        })
      );
      await queryClient.invalidateQueries({ queryKey: ["cardData", cardId, cardLength] });
      
      if (selectedItem && selectedItem.id === variables.id) {
        const updatedItem = {
          ...selectedItem,
          title: variables.title,
          dueDate: variables.dueDate,
          assigneeName: variables.assigneeName,
          statusName: variables.statusName,
          body: variables.body,
          amount: variables.amount,
        };
        const isImageAttachment = variables.attachedFileUrl && 
        variables.attachedFileUrl.startsWith('data:image/');
      
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
      onShowSaveModal();
    },
    onError: (error: Error) => {
      console.error("에러 발생:", error);
      alert("수정 중 오류가 발생했습니다.");
    },
  });
  
  const { mutate: deleteItemMutate } = useMutation({
    mutationFn: () => {
      if (!ids.checklistId || !ids.largeCatItemId || !ids.smallCatItemId) {
        throw new Error('ids가 없습니다');
      }
      
      return deleteItem(
        ids.checklistId,
        ids.largeCatItemId,
        ids.smallCatItemId
      );
    },
    onSuccess: () => {
      queryClient.removeQueries({ 
        queryKey: ["smallCatData", ids.checklistId, ids.largeCatItemId, ids.smallCatItemId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["cardData"] 
      });
      onDeleteSuccess();
      alert("성공적으로 삭제되었습니다.");
      onClose();
    },
    onError: (error) => {
      console.error('Delete failed:', error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  });

  useEffect(() => {
    if (smallCatData) {
      console.log('Loaded small cat data:', smallCatData);

      const displayAmount = smallCatData.amount ? smallCatData.amount / 10000 : 0;
      
      setFormData({
        title: smallCatData.title || item.title || "",
        dueDate: smallCatData.dueDate || item.dueDate || "",
        assigneeName: smallCatData.assigneeName || item.assigneeName || "신부",
        body: smallCatData.body || item.body || "",
        statusName: smallCatData.statusName || item.statusName || "진행 중",
        amount: displayAmount,
        attachedFileUrl: smallCatData.attachedFileUrl || item.attachedFileUrl || "",
      });
    }
  }, [smallCatData, item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (fileUrl: string) => {
    setFormData(prev => ({
      ...prev,
      attachedFileUrl: fileUrl
    }));
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
      return;
    }

    const serverAmount = Number(formData.amount) * 10000;

    if (formData.attachedFileUrl) {
      const sizeInKB = Math.round(formData.attachedFileUrl.length / 1024);
      console.log(`attachedFileUrl 크기: ${sizeInKB}KB`);
      
      // 경고: 1MB 이상이면 경고 표시
      if (sizeInKB > 1024) {
        console.warn(`첨부 파일 크기가 큽니다: ${sizeInKB}KB`);
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

    setFormData(prev => ({
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
            <Image src={assignee} alt="담당자" width={16} height={16} />
            <p>담당자</p>
          </div>
          <div className={cn("people")}>
          <button 
              type="button"
              className={cn("assigneeBtn", { active: formData.assigneeName === "신랑" })}
              onClick={() => setFormData(prev => ({ ...prev, assigneeName: "신랑" }))}
            >
              신랑
            </button>
            <button 
              type="button"
              className={cn("assigneeBtn", { active: formData.assigneeName === "신부" })}
              onClick={() => setFormData(prev => ({ ...prev, assigneeName: "신부" }))}
            >
              신부
            </button>

          </div>
          <div className={cn("date", "label")}>
            <Image src={date} alt="날짜" width={16} height={16} />
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
            <Image src={amount} alt="금액" width={16} height={16} />
            <input type="number" onChange={handleChange} value={formData.amount} name="amount" />
            <span>만원</span>
          </div>
          <div className={cn("detail","label")}>
            <div className={cn("detailIcon")}>
              <Image className={cn("detailIconMargin")} src={detail} alt="내용" width={16} height={16} />
              <p>내용</p>
            </div>
            <div className={cn("modalDetail")}>
              <TextEditor 
                content={formData.body} 
                onContentChange={(newContent: any) => setFormData((prev) => ({ ...prev, body: newContent }))}
                onFileUpload={handleFileUpload}
                item={item}
              />
            </div>
          </div>
          <div className={cn("modalFooter")}>
            <button type="submit" className={cn("saveBtn")} disabled={isUpdating}>
              {isUpdating ? "저장 중..." : "저장하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
