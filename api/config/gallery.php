<?php

return [
    'paginator' => [
        'per_page' => 8,
        'pages_per_range' => 10,
    ],

    'cache' => [
        'dim_filter' => [
            'key' => 'gallery_dim_filter',
            'time' => 60 * 60, // 1 hour
        ],
    ],

    'fx' => [
        'parameters' => [
            'grayscale' => 'grayscale',
            'blur' => 'blur',
        ],

        'blur' => [
            'min' => 0,
            'max' => 10,
        ],
    ],
];
