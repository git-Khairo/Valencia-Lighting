<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ env('APP_NAME') }}</title>
    @viteReactRefresh
    @vite(['resources/js/index.jsx', 'resources/css/app.css'])
</head>
<body>
    <div id="root"></div>
</body>
</html>
