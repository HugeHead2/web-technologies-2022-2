<?php
// Задание 3
include 'lib/ImageResize.php';

use \Gumlet\ImageResize;

if (!empty($_FILES)) {
    $path = "upload/big/" . $_FILES['image']['name'];

    $uploadDir = 'upload/big/';
    $uploadFile = $uploadDir . basename($_FILES['image']['name']);

//Проверка существует ли файл
    if (file_exists($uploadFile)) {
        echo "Файл $uploadFile существует, выберите другое имя файла!";
        exit;
    }

//Проверка на размер файла
    if ($_FILES["image"]["size"] > 1024 * 5 * 1024) {
        echo("Размер файла не больше 5 мб");
        exit;
    }
//Проверка расширения файла
    $blacklist = array(".php", ".phtml", ".php3", ".php4");
    foreach ($blacklist as $item) {
        if (preg_match("/$item\$/i", $_FILES['image']['name'])) {
            echo "Загрузка php-файлов запрещена!";
            exit;
        }
    }
//Проверка на тип файла
    $imageInfo = getimagesize($_FILES['image']['tmp_name']);
    if ($imageInfo['mime'] != 'image/png' && $imageInfo['mime'] != 'image/jpeg') {
        echo "Можно загружать только jpg и png файлы, неверное содержание файла, не изображение.";
        exit;
    }

    if ($_FILES['image']['type'] != "image/jpeg" && $_FILES['image']['type'] != "image/png") {
        echo "Можно загружать только изображения.";
        exit;
    }

    if (move_uploaded_file($_FILES['image']['tmp_name'], $path)) {
        $message = "ok";
        $image = new ImageResize($path);
        $image->resizeToHeight(200);
        $image->save("upload/small/" . $_FILES['image']['name']);
    } else {
        $message = "error";
    }

    header("Location: index.php?status=$message");
    die();
}
