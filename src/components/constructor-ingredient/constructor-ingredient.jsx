import React, { useRef } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_FROM_CONSTRUCTOR } from "../../services/actions/ingredients";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";

export const ConstructorIngredient = ({ name, image, price, _id, moveCardHandler, index}) => {

  const dispatch = useDispatch()

  const { constructorItems } = useSelector((state) => state.ingredients);

  const isBun = constructorItems.length && constructorItems[0].type === "bun"

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;


        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        moveCardHandler(dragIndex, hoverIndex);

        item.index = hoverIndex;
    },
});

    const [{ isDragging }, drag] = useDrag({
        /* item: { type: 'item', index }, */
        type: 'item',
        item: {
          id: _id,
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));



  return (
      <>
        <DragIcon type="primary" ref={ref}/>
        <ConstructorElement
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
          }}
        />
      </>

  );
};
