import React, { useRef } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  moveItem,
  recalculatePrice,
  removeFromConstructor,
} from "../../services/actions/ingredients";
import { useDrop, useDrag } from "react-dnd";
import styles from "./constructor-ingredient.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { ConstructorEL } from "../../utils/interfaces";

export const ConstructorIngredient: React.FC<ConstructorEL> = ({
  name,
  image,
  price,
  _id,
  index,
}) => {
  const dispatch = useAppDispatch();

  const { constructorItems } = useAppSelector((state) => state.ingredients);

  const isBun = constructorItems.length && constructorItems[0].type === "bun";

  const [, dropRef] = useDrop({
    accept: "constructor-item",
    hover: (item: ConstructorEL, monitor) => {
      if (ref.current !== null) {
        const dragIndex = item.index;
        const hoverIndex = index;
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverActualY =
          monitor.getClientOffset()!.y - hoverBoundingRect.top;

        if (dragIndex! < hoverIndex! && hoverActualY < hoverMiddleY) return;
        if (dragIndex! > hoverIndex! && hoverActualY > hoverMiddleY) return;

        dispatch(
          moveItem(dragIndex! + (isBun ? 1 : 0), hoverIndex! + (isBun ? 1 : 0))
        );

        item.index = hoverIndex;
      }
    },
  });

  const [, dragRef] = useDrag({
    type: "constructor-item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ref: React.RefObject<HTMLDivElement> = useRef(null);
  const dragDropRef: any = dragRef(dropRef(ref));

  return (
    <>
      <div className={styles.ingredient} id={_id} ref={dragDropRef}>
        <DragIcon type="primary" />
        <ConstructorElement
          isLocked={false}
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => {
            dispatch(removeFromConstructor(index! + (isBun ? 1 : 0)));
            dispatch(recalculatePrice());
          }}
        />
      </div>
    </>
  );
};
