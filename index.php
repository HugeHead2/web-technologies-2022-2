<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>Галлерея</h1>
<?php
// Задание 1 и 2
function buildGallery($pathToImagesFolder)
{
    if (scandir($pathToImagesFolder . 'big') && scandir($pathToImagesFolder . 'small')) {
        foreach (array_slice(scandir($pathToImagesFolder . 'big'), 2) as $image) {
            echo '<a target="_blank" href="' . $pathToImagesFolder . 'big/' . $image . '"><img src="' . $pathToImagesFolder . 'small/' . $image . '"></a>';
        }
    }
}

buildGallery('upload/');

// Задание 4 и 5
if (file_exists('logs/log.txt') && count(file('logs/log.txt')) == 10) {
    $numOfLogs = count(array_slice(scandir('logs/'), 2)) - 1;
    rename('logs/log.txt', 'logs/log' . $numOfLogs . '.txt');
    file_put_contents('logs/log.txt', date('H:i:s d-m-Y') . PHP_EOL);
} else {
    file_put_contents('logs/log.txt', date('H:i:s d-m-Y') . PHP_EOL, FILE_APPEND);
}
?>
<p>Загрузить новый файл</p>
<?php
$messages = [
    'ok' => "Файл загружен успешно",
    'error' => "Ошибка загрузки",
];
if (!empty($_GET['status'])) {
    echo '<p>' . $messages[$_GET['status']] . '</p>';
}
?>
<!-- Задание 3 -->
<form method="post" enctype="multipart/form-data" action="upload.php">
    <input type="file" name="image" accept=".jpeg,.png,.jpg">
    <input type="submit" value="Загрузить">
</form>
</body>
</html>