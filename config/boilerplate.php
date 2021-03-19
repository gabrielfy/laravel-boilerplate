<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------------------
    |
    | Configurations related to the boilerplate's access/authorization options
    */
    'auth' => [
        'user' => [

            /*
             * Whether or not a user can change their email address after
             * their profile has already been created
             */
            'change_email' => env('CHANGE_EMAIL', true),
        ],

        'role' => [

            /*
             * The name of the administrator role
             * Should be Administrator by design and unable to change from the admin
             * It is not recommended to change
             */
            'admin' => 'Administrator',

            /*
             * Default role
             */
            'default' => 'User',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Google Analytics
    |--------------------------------------------------------------------------
    |
    | Found in views/includes/partials/ga.blade.php
    */
    'google_analytics' => env('GOOGLE_ANALYTICS', 'UA-XXXXX-X'),

    /*
    |--------------------------------------------------------------------------
    | Avatar
    |--------------------------------------------------------------------------
    |
    | Configurations related to the boilerplate's avatar system
    */
    'avatar' => [

        /*
         * Default avatar size
         */
        'size' => 80,

        /*
         * Hex color for the font, without the hash (#)
         */
        'color' => '7F9CF5',

        /*
         * Hex color for the image background, without the hash (#)
         */
        'background' => 'EBF4FF',
    ],

    /*
    |--------------------------------------------------------------------------
    | Locale
    |--------------------------------------------------------------------------
    |
    | Configurations related to the boilerplate's locale system
    */
    'locale' => [
        /*
         * Whether or not to show the language picker, or just default to the default
         * locale specified in the app config file
         */
        'status' => true,

        /*
         * Available languages
         *
         * Add your language code to this array.
         * The code must have the same name as the language folder.
         * Be sure to add the new language in an alphabetical order.
         *
         * The language picker will not be available if there is only one language option
         * Commenting out languages will make them unavailable to the user
         */
        'languages' => [
            'en' => ['name' => 'English', 'image' => 'img/flags/en.svg', 'rtl' => false],
            'pt_BR' => ['name' => 'Brazilian Portuguese', 'image' => 'img/flags/br.svg', 'rtl' => false],
        ],
    ],
];
