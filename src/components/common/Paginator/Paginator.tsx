import React, {useEffect, useState} from 'react';
import s from "./Paginator.module.css";
import cn from "classnames"

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize,  ...props}: PropsType) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    useEffect(()=>
        setPortionNumber(Math.ceil(currentPage/portionSize)),
        [currentPage]);

    return <div className={s.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
            {pages
                .filter(p => p>= leftPortionPageNumber && p<=rightPortionPageNumber)
                .map((p) => {
                return <span className={cn({
                    [s.selectedPage]: currentPage === p
                }, s.pageNumber)}
                            key={p}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
    {portionCount > portionNumber &&
       <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button> }
        </div>
};

