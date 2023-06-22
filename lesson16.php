<?php
$title = "16 lesson";
$header = "Заголовок";
$currentYear = "2023";

function getCurrentTime() {
    date_default_timezone_set('Asia/Yekaterinburg');

    $hours = date('G');
    $minutes = date('i');

    $hoursSuffix = '';
    $minutesSuffix = '';

    if ($hours % 10 == 1 && $hours != 11) {
        $hoursSuffix = 'час';
    } elseif (($hours % 10 == 2 || $hours % 10 == 3 || $hours % 10 == 4) && ($hours < 10 || $hours > 20)) {
        $hoursSuffix = 'часа';
    } else {
        $hoursSuffix = 'часов';
    }

    if ($minutes % 10 == 1 && $minutes != 11) {
        $minutesSuffix = 'минута';
    } elseif (($minutes % 10 == 2 || $minutes % 10 == 3 || $minutes % 10 == 4) && ($minutes < 10 || $minutes > 20)) {
        $minutesSuffix = 'минуты';
    } else {
        $minutesSuffix = 'минут';
    }

    $result = $hours . ' ' . $hoursSuffix . ' ' . $minutes . ' ' . $minutesSuffix;

    return $result;
}
?>



<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= $title ?></title>
</head>
<body>
<div>
    <h1><?= $header ?></h1>
    <p><?= $currentYear ?></p>
</div>

<div>
    <? print_r(getCurrentTime()) ?>
</div>
</body>
</html>
