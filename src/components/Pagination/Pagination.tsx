import {useEffect} from 'react';
import './Pagination.css'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"
import { decrementPage, incrementPage, paginate } from './PaginationSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/tsHooks';
import ProxyForLoaders from '../ProxyForLoaders/ProxyForLoaders';

// interface Props<T> {
//     elements: T[],  
//     elementsXPage: number,
//     totalElements?: number,
//     pages?: number,
//     Component: 
// }

interface Props<T> {
    Component: (prop: T) => JSX.Element,
    elements: T[],
    section: string,
    elName: string,
    classNameContainer?: string
}

const Pagination: React.FC<Props<any>> = ({
    Component,
    elements,
    section,
    elName,
    classNameContainer
}) => {
    const paginationSections = useAppSelector(state => state.pagination);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const el = {
            totalElements: elements.length,
            elements,
            section
        }
        console.log(el)
        dispatch(paginate(el))
    }, [elements])

    //console.log(paginationSections)
    //console.log(elements)

    console.log("Pagination renders")

    if (!paginationSections[section]) return <ProxyForLoaders type="small" />

    return (
        //<div className={!classNameContainer ? 'pagination' : classNameContainer}>
        <>
            <div className={!!classNameContainer? classNameContainer : undefined}>
                {paginationSections[section].allPages.length ? (
                    paginationSections[section]
                        .allPages[paginationSections[section].currentPage - 1].map(el => <Component {...el} />)
                ) : (<></>)}
            </div>
            {paginationSections[section].allPages.length ? (
                <div className='pagination-control'>
                    <button
                        type='button'
                        onClick={paginationSections[section].currentPage === 1 ? undefined : () => dispatch(decrementPage({ section }))}
                    >
                        <MdArrowBackIos />
                    </button>
                    <p>
                        {paginationSections[section].currentPage === 1
                            ? 1
                            : (paginationSections[section].currentPage - 1) * paginationSections[section].elementsXPage
                        }
                        -
                        {paginationSections[section].currentPage === 1
                            ? paginationSections[section].allPages[0].length
                            : paginationSections[section].currentPage === paginationSections[section].pages
                                ? paginationSections[section].totalElements
                                : paginationSections[section].currentPage * paginationSections[section].elementsXPage
                        } of {paginationSections[section].totalElements} {elName}
                    </p>
                    <button
                        type='button'
                        onClick={paginationSections[section].currentPage === paginationSections[section].pages ? undefined : () => dispatch(incrementPage({ section }))}
                    >
                        <MdArrowForwardIos />
                    </button>
                </div>
            ): (<></>)}
        </>
    );
};

export default Pagination;