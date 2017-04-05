function checkFilter(category, title, checked) {
    if (checked) {
        this[category].push(title);
    } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
            this[category].splice(index, 1);
        }
    }
};

function setDay(day) {
    console.log('Recived day = ' + day);
    console.log('Store day = ' + this.day);
    this.day = day;
    console.log('Store day2 = ' + this.day);
    console.log('----------------');
}

export { checkFilter, setDay };