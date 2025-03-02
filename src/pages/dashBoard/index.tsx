import Amount from "@/components/domains/WorkSpace/DashBoard/Amount";
import Progress from "@/components/domains/WorkSpace/DashBoard/Progress";
import SideMenu from "@/components/domains/WorkSpace/SideMenu";
import DashBoardModal from "@/components/modals/DashBoardModal";
import { getCard } from "@/lib/apis/workSpace";
import useSideMenuStore from "@/lib/store/sideMenu";
import { useWorkSpaceStore } from "@/lib/store/workSpaceData";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function DashBoard() {
  const [amount, setAmount] = useState<any>([]);
  const [cardId, setCardId] = useState<number>(1);
  const [cardLength, setCardLength] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const { checklistId, selectLargeItem, setSelectLargeItem } =
    useWorkSpaceStore();
  const { sideMenuState } = useSideMenuStore();

  const { data: cardDatas, isSuccess } = useQuery({
    queryKey: ["cardData", cardId, cardLength],
    queryFn: () => getCard(cardId, ""),
  });

  const handleOpenModal = (item: any) => {
    const fetchCategoryData = async () => {
      try {
        const categoryWithAmounts = item;
        setSelectedItem(categoryWithAmounts);
        setShowModal(true);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    fetchCategoryData();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectLargeItem(null);
    setSelectedItem(null);
  };

  useEffect(() => {
    console.log("Modal state:", { showModal, selectedItem });
  }, [showModal, selectedItem]);

  useEffect(() => {
    setAmount(cardDatas);
  }, [isSuccess]);

  return (
    <div className={cn("workSide")}>
      <span className={cn("sideMenuBox", { active: sideMenuState })}></span>

      <main className={cn("dashBoardMain")}>
        <div className={cn("dashBoardWrap")}>
          <Progress />
          {amount && amount.length > 0 && (
            <Amount
              data={amount}
              setAmount={setAmount}
              onOpenModal={handleOpenModal}
            />
          )}
        </div>
      </main>
      <SideMenu state={sideMenuState} />
      {showModal && selectedItem && (
        <DashBoardModal
          isOpen={showModal}
          onClose={handleCloseModal}
          data={selectedItem}
        />
      )}
    </div>
  );
}
