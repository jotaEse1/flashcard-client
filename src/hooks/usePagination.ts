export function usePagination<T>(element: T[]) {
    if(!element.length){
        return {
            allPages: [],
            totalElements: 0,
            elementsXPage: 0,
            pages: 0
        }
    }

    let elementsXPage = 20,
        totalElements = element.length,
        pages = Math.ceil(totalElements / elementsXPage),
        allPages = [],
        minLong = 0,
        maxLong = elementsXPage;

    for (let index = 0; index < pages; index++) {
        allPages.push(element.slice(minLong, maxLong))

        minLong += elementsXPage
        maxLong += elementsXPage
    }

    return {
        allPages,
        totalElements,
        elementsXPage,
        pages
    }
}