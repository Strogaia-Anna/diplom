export const getEnd = (data) => {
    const ost = data % 10;
    if(ost >= 5 || ost == 0) {
        return "";
    } else if (ost == 1) {  
        return "а"
    } else {
        return "ы"
    }
};

const colors = ['lightgreen', 'lightblue', 'aqua', 'green', 'blue', 'red', 'yellow', 'pink', 'violet', 'orange']

export const getColor = (ind) => {
    if (ind >= colors.length) {
        ind -= colors.length
    }
    return colors[ind];
}