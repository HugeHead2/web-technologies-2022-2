function pickPropArray(arr, prop){
    res = []
    for(i = 0; i<arr.length;i++){
        res.push(arr[i][prop])
    }
    return res
}

function createCounter() {
    count = 0
    return function () {
        count++
        return count
    }
}

function spinWords(word){
    arr = word.split(" ")
    for(i = 0; i < arr.length; i++){
        if(arr[i].length >= 5){
            arr[i] = arr[i].split("").reverse().join("")
        }
    }
    return arr.join(" ")
}

function getIndexOfTarget(nums, target) {
    for (let i = 0; i < nums.length; i++)
        for (let j = i; j < nums.length; j++)
            if (nums[i] + nums[j] === target)
                return [i, j];

    return [];
}

function getLargestPrefix(strings) {
    let prefix = strings[0].slice(-1);
    let prefixLength = 1;
    while(true) {
        for (let i = 0; i < strings.length; i++) {
            if(!strings[i].endsWith(prefix))
                return prefix.slice(1).length > 1 ? prefix.slice(1) : '';
        }
        prefixLength++;
        prefix = strings[0].slice(-prefixLength);
    }
}


const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
]

const result = pickPropArray(students, 'name')

console.log(result)

const counter1 = createCounter()
counter1() // 1
console.log(counter1())

const counter2 = createCounter()
counter2() // 1
console.log(counter2())

console.log(spinWords("Привет от Legacy"))

console.log(getIndexOfTarget([4,6,7,12,4,7,23], 30));

console.log(getLargestPrefix(["цветок","поток","хлопок"]));
console.log(getLargestPrefix(["собака","гоночная машина","машина"]));
