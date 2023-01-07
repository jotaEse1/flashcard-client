export const fisherYatesAlgo = (arr: any[], n: number) => {
    for (let i = n - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

}