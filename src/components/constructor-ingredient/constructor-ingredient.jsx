import React, { useRef } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_FROM_CONSTRUCTOR } from "../../services/actions/ingredients";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";

export const ConstructorIngredient = ({ name, image, price, _id, index}) => {

  const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "item",
        hover(_id, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = _id;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            _id = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'item', index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));


  const dispatch = useDispatch()

  const { constructorItems } = useSelector((state) => state.ingredients);

  const isBun = constructorItems.length && constructorItems[0].type === "bun"
  return (
      <>
        <DragIcon type="primary" />
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
