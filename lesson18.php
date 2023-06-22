<?php

function printNumbers()
{
    $i = 0;
    do {
        $suffix = "- это ноль.";
        if ($i != 0)
        {
            $suffix = $i % 2 == 0 ? "- чётное число" : "- нечётное число";
        }
        echo "<div>$i $suffix</div>";
        $i++;
    } while ($i <= 10);
}

function kyrillToLatin($string)
{
    $array = array(
        "а" => "a","б" => "b","в" => "v","г" => "g","д" => "d","е" => "e",
        "ж" => "zh","з" => "z","и" => "i","й" => "y","к" => "k","л" => "i","м" => "m",
        "н" => "n","о" => "o","п" => "p","р" => "r","с" => "s","т" => "t","у" => "u",
        "ф" => "f","х" => "h","ц" => "ts","ч" => "ch","ш" => "sh","щ" => "sht","ъ" => "а",
        "ь" => "y","ю" => "yu","я" => "ya"
    );

    return strtr($string, $array);
}

function getMenu($menuArray)
{
    $res = "";
    foreach ($menuArray as $item)
    {
        $content = is_array($item) ? "<ul>".getMenu($item)."</ul>" : $item;
        $res = $res."<li>$content</li>";
    }
    return $res;
}


$array = array(
    "Тюменская область" => array("Тюмень", "Ялуторовск"),
    "Московская область" => array("Москва", "Зеленоград")
);

foreach ($array as $key => $value)
{
    echo "<div>$key</div>";
    echo "<div>";
    foreach ($value as &$city)
    {
        echo "$city, ";
    }
    echo "</div>";
}



printNumbers();

$word = kyrillToLatin("арбуз");

echo $word;
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
<div>
    <ul>
        <?php
        $array = array(
            "Тюменская область", array("Тюмень", "Ялуторовск"),
            "Московская область", array("Москва", "Зеленоград")
        );
        $menu = getMenu($array);
        echo $menu;
        ?>
    </ul>
</div>
</body>

</html>