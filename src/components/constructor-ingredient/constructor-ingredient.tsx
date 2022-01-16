import React, { useRef } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_FROM_CONSTRUCTOR, MOVE_ITEM, RECALCULATE_PRICE } from "../../services/actions/ingredients";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import styles from './constructor-ingredient.module.css'
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TIngredient } from "../../utils/types";
import { ConstructorEL } from "../../utils/interfaces"

export const ConstructorIngredient : React.FC<ConstructorEL> = ({ name, image, price, _id, index}) => {
  const dispatch = useAppDispatch()

  const { constructorItems } = useAppSelector((state) => state.ingredients);

  const isBun = constructorItems.length && constructorItems[0].type === "bun"


    const [, dropRef] = useDrop({
      accept: 'constructor-item',
      hover: (item: ConstructorEL, monitor) => {

          const dragIndex = item.index
          const hoverIndex = index
          const hoverBoundingRect = ref?.current.getBoundingClientRect()
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top


          if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
          if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

          dispatch({
            type: MOVE_ITEM,
            dragIndex: dragIndex  + (isBun ? 1 : 0),
            hoverIndex: hoverIndex  + (isBun ? 1 : 0)
          })
          item.index = hoverIndex
      },
    })

    const [, dragRef] = useDrag({
      type: 'constructor-item',
      item: { index },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
    })

    const ref : React.MutableRefObject<null> = useRef(null)
    const dragDropRef : RefObject<HTMLDivElement> = dragRef(dropRef(ref))

  return (
    <>
      <div className={styles.ingredient} ref={dragDropRef}>
        <DragIcon type="primary" />
        <ConstructorElement
          style={{width : '100%'}}
          id={_id}
          isLocked={false}
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => {
            dispatch({
              type: REMOVE_FROM_CONSTRUCTOR,
              id: _id,
              index: index + (isBun ? 1 : 0)
            });
            dispatch({
              type: RECALCULATE_PRICE,
            });
          }}
        />
      </div>
    </>
  );
};
