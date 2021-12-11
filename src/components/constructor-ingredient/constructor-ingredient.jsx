import React, { useRef } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_FROM_CONSTRUCTOR, MOVE_ITEM } from "../../services/actions/ingredients";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";

export const ConstructorIngredient = ({ name, image, price, _id, index}) => {

  const dispatch = useDispatch()

  const { constructorItems } = useSelector((state) => state.ingredients);

  const isBun = constructorItems.length && constructorItems[0].type === "bun"


    const [spec, dropRef] = useDrop({
      accept: 'constructor-item',
      hover: (item, monitor) => {

          const dragIndex = item.index
          const hoverIndex = index
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

          // if dragging down, continue only when hover is smaller than middle Y
          if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
          // if dragging up, continue only when hover is bigger than middle Y
          if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

          dispatch({
            type: MOVE_ITEM,
            dragIndex: dragIndex  + (isBun ? 1 : 0),
            hoverIndex: hoverIndex  + (isBun ? 1 : 0)
          })
          item.index = hoverIndex
      },
    })

    const [{ isDragging }, dragRef] = useDrag({
      type: 'constructor-item',
      item: { index },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
    })

    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    const opacity = isDragging ? 0 : 1


  return (
        <div style={{ opacity }} ref={dragDropRef}>
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
            }}
          />
        </div>



  );
};
