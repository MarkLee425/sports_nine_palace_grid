import { cn } from "@/utils/cn";
import { useState } from "react";
import Popup from "./Popup";
import React from "react";
import IconContainer from "./IconContainer";
import { Prettify } from "@/utils/Prettify";

type CategoryItem = {
  name: string;
  id: string;
  icon?: Buffer | string;
  description: string;
};

const CATEGORIES: CategoryItem[] = [
  {
    name: "a",
    icon: "",
    id: "1",
    description: "",
  },
  {
    name: "a",
    icon: "",
    id: "2",
    description: "",
  },
  {
    name: "a",
    icon: "",
    id: "3",
    description: "",
  },
  {
    name: "a",
    icon: "",
    id: "4",
    description: "",
  },
  {
    name: "a",
    icon: "",
    id: "5",
    description: "",
  },
  {
    name: "a",
    icon: "",
    id: "6",
    description: "",
  },
];

type GridGuessItemsInColumnType = {
  currentIndex: number;
  onClick: () => void;
};

type GridGuessItemsType = Prettify<
  GridGuessItemsInColumnType & {
    isRight?: boolean;
    itemNo: number;
  }
>;

type GridCategoryType = {
  name: string;
  id: string;
};

const GridGuessItem = ({
  currentIndex,
  onClick,
  isRight = false,
  itemNo,
}: GridGuessItemsType) => {
  return (
    <div
      className={cn(
        `
        min-w-[100%] 
        min-h-[100%] 
        flex 
        justify-center 
        items-center 
        border-t 
        border-l
        cursor-pointer
        hover:bg-gray-100
      `,
        {
          "border-b": currentIndex === CATEGORIES.length - 1,
          "border-r": isRight,
          "rounded-tl-md": currentIndex === 3 && itemNo === 1, // Top-left corner
          "rounded-tr-md": currentIndex === 3 && itemNo === 3, // Top-right corner
          "rounded-bl-md": currentIndex === 5 && itemNo === 1, // Bottom-left corner
          "rounded-br-md": currentIndex === 5 && itemNo === 3, // Bottom-right corner
        }
      )}
      onClick={onClick}
      key={`${itemNo}_${currentIndex}`}
    />
  );
};

const GridGuessItemsInColumn = ({
  onClick,
  currentIndex,
}: GridGuessItemsInColumnType) => {
  return (
    <React.Fragment key={`column_${currentIndex}`}>
      <GridGuessItem currentIndex={currentIndex} onClick={onClick} itemNo={1} />
      <GridGuessItem currentIndex={currentIndex} onClick={onClick} itemNo={2} />
      <GridGuessItem
        currentIndex={currentIndex}
        onClick={onClick}
        isRight
        itemNo={3}
      />
    </React.Fragment>
  );
};

const GridCategory = ({ id }: GridCategoryType) => (
  <div
    className="
      min-w-[100%] 
      min-h-[100%] 
      flex 
      justify-center 
      items-center
    "
    key={id}
  >
    <IconContainer href="/ricci.png"/>
    {/* Case of no image */}
    {/* <h1>Title</h1> */}
  </div>
);

const GridItems = ({ onClick }: { onClick: () => void }) =>
  CATEGORIES.map((each, i) =>
    i <= 2 ? (
      <GridCategory key={each.id} name={each.name} id={each.id} />
    ) : (
      <React.Fragment key={each.id}>
        <GridCategory name={each.name} id={each.id} />
        <GridGuessItemsInColumn onClick={onClick} currentIndex={i} />
      </React.Fragment>
    )
  );

export const NineSquareGrid = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const openPopupHandler = () => {
    setIsPopup(true);
  };

  const closePopupHandler = (value: string) => {
    setIsPopup(false);
    setSelectedValue(value);
  };

  return (
    <>
      {isPopup && (
        <Popup
          open={isPopup}
          selectedValue={selectedValue}
          onClose={closePopupHandler}
        />
      )}
      <div
        className="
          min-w-[50rem] 
          min-h-[50rem] 
          mr-[10rem] 

          max-[950px]:min-w-[40rem] 
          max-[950px]:min-h-[40rem] 
          max-[950px]:mr-[8rem] 

          max-[750px]:min-w-[30rem] 
          max-[750px]:min-h-[30rem] 
          max-[750px]:mr-[4.5rem] 

          max-[550px]:min-w-[20rem] 
          max-[550px]:min-h-[20rem] 
          max-[550px]:mr-[2rem] 

          max-[350px]:min-w-[10rem] 
          max-[350px]:min-h-[10rem] 
          max-[350px]:ml-[1rem] 

          grid grid-cols-4 
          grid-rows-4 
          gap-x-0 
          text-center
        "
      >
        {/* Empty div for the first index of grid */}
        <div className="empty" key="empty-div"></div>
        <GridItems onClick={openPopupHandler} key="grid-items" />
      </div>
    </>
  );
};
