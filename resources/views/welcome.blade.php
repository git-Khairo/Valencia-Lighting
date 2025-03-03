<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@200..800&family=Genos:ital,wght@0,100..900;1,100..900&family=Libre+Franklin:ital,wght@0,100..900;1,100..900&family=Limelight&display=swap" rel="stylesheet">
    <title>{{ env('APP_NAME') }}</title>
</head>
<body>
    <div id="app"></div>

    @viteReactRefresh
    @vite(['resources/js/App.jsx', 'resources/css/app.css'])
</body>
</html>
