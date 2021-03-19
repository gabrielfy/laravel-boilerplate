<?php

use App\Http\Controllers\Profile\ProfilePhotoController;
use App\Http\Controllers\Profile\UserProfileController;
use App\Http\Controllers\Profile\OtherBrowserSessionsController;

Route::name('user-profile-information.')->group(function() {
    Route::put('delete-profile-photo', [ProfilePhotoController::class, 'delete'])->name('delete-profile-photo');
    Route::put('upload-profile-photo', [ProfilePhotoController::class, 'upload'])->name('upload-profile-photo');

    Route::get('profile', [UserProfileController::class, 'index'])->name('index');
});

Route::post('other-browser-sessions.destroy', [OtherBrowserSessionsController::class, 'destroy'])->name('other-browser-sessions.destroy');
