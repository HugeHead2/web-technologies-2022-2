<?php
$a = 100;
$b = -15;

if ($a > 0 && $b > 0) {
    $difference = $a - $b;
    echo "Разность: " . $difference;
} elseif ($a < 0 && $b < 0) {
    $product = $a * $b;
    echo "Произведение: " . $product;
} else {
    $sum = $a + $b;
    echo "Сумма: " . $sum;
}


$a = rand(0, 15);

switch ($a) {
    case 0:
        echo "0\n";
    case 1:
        echo "1\n";
    case 2:
        echo "2\n";
    case 3:
        echo "3\n";
    case 4:
        echo "4\n";
    case 5:
        echo "5\n";
    case 6:
        echo "6\n";
    case 7:
        echo "7\n";
    case 8:
        echo "8\n";
    case 9:
        echo "9\n";
    case 10:
        echo "10\n";
    case 11:
        echo "11\n";
    case 12:
        echo "12\n";
    case 13:
        echo "13\n";
    case 14:
        echo "14\n";
    case 15:
        echo "15\n";
        break;
}

//3 задание
function addition($a, $b) {
    return $a + $b;
}

function subtraction($a, $b) {
    return $a - $b;
}

function multiplication($a, $b) {
    return $a * $b;
}

function division($a, $b) {
    if ($b != 0) {
        return $a / $b;
    } else {
        return "Ошибка: деление на ноль!";
    }
}

function mathOperation($arg1, $arg2, $operation) {
    switch ($operation) {
        case '+':
            return addition($arg1, $arg2);
        case '-':
            return subtraction($arg1, $arg2);
        case '*':
            return multiplication($arg1, $arg2);
        case '/':
            return division($arg1, $arg2);
        default:
            return "Ошибка: недопустимая операция";
    }
}

function power($val, $pow) {
    if ($pow === 0) {
        return 1;
    }

    return $val * power($val, $pow - 1);
}
?>
