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
