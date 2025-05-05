<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="jFV_OZ2goHuBlUMbkyC74b_bT3gQJF9i7Grs4lWVyH0" />
    <!-- SEO Meta Tags -->
    <title>Vallencia Lighting</title>
    <meta name="description" content="Discover modern lighting solutions at Vallencia. Shop LED lights, chandeliers, and more for your home or business. Illuminate your space today!">
    <meta name="keywords" content="modern lighting, LED lights, chandeliers, home lighting, commercial lighting, energy-efficient lighting, pendant lights, outdoor lighting, smart lighting, decorative lighting, Vallencia Lighting, modern LED chandeliers, luxury lighting, wall sconces, recessed lighting">
    <meta name="robots" content="index, follow">
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Modern Lighting Solutions | {{ config('app.name', env('APP_NAME', 'Vallencia Lighting')) }}">
    <meta property="og:description" content="Explore Vallencia’s range of modern lighting, including LED lights and chandeliers for homes and businesses. Shop now!">
    <meta property="og:image" content="/storage/logo/vallencia logo.png">
    <meta property="og:url" content="https://vallencialighting.com">
    <meta property="og:type" content="website">
    <!-- Structured Data for Organization -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Vallencia Lighting",
        "url": "https://vallencialighting.com",
        "logo": "/storage/logo/vallencia logo.png'",
        "sameAs": [
            "https://www.instagram.com/vallencia_lighting"
        ]
    }
    </script>
    <!-- Sitemap Reference -->
    <link rel="sitemap" type="application/xml" href="{{ asset('sitemap.xml') }}" />
    <!-- Fonts and Favicon -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Alumni+Sans+Pinstripe:ital@0;1&family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&family=Anaheim:wght@400..800&family=Average+Sans&family=Encode+Sans+Condensed:wght@100;200;300;400;500;600;700;800;900&family=Gruppo&family=Jura:wght@300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Slabo+13px&family=Sulphur+Point:wght@300;400;700&family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link rel="icon" type="image/png" href="/storage/logo/vallencia logo.png" />
    <link rel="icon" href="/storage/logo/vallencia logo.png" type="image/x-icon">
    <link rel="apple-touch-icon" href="/storage/logo/vallencia logo.png">
</head>
<body>
    <div id="app"></div>

    @viteReactRefresh
    @vite(['resources/js/App.jsx', 'resources/css/app.css'])
</body>
</html>