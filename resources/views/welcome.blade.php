<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Alumni+Sans+Pinstripe:ital@0;1&family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&family=Anaheim:wght@400..800&family=Average+Sans&family=Encode+Sans+Condensed:wght@100;200;300;400;500;600;700;800;900&family=Gruppo&family=Jura:wght@300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Slabo+13px&family=Sulphur+Point:wght@300;400;700&family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link rel="icon" type="image" href="/storage/logo/vallencia logo.png" />
    <title>{{ env('APP_NAME') }}</title>
</head>
<body>
    <div id="app"></div>

    @viteReactRefresh
    @vite(['resources/js/App.jsx', 'resources/css/app.css'])
</body>
</html>
