<?php

/*
 * This file is part of iamdarkle/fancybox
 *
 * Copyright (c) 2022 Tomás Romero.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Flarum\Extend;

return [
  //  (new Extend\Frontend('forum'))
  //      ->content(function (Flarum\Frontend\Document $document) {
  //          $document->head[] = '<script defer src="https://unpkg.com/modern-screenshot"></script>';
  //      }),
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
   (new Extend\Locales(__DIR__.'/locale')),
];
