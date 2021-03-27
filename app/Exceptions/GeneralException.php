<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class GeneralException extends Exception
{
    /**
     * @var string
     */
    protected $message;

    /**
     * GeneralException constructor.
     *
     * @param string         $message
     * @param int            $code
     * @param Throwable|null $previous
     */
    public function __construct($message = '', $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return redirect()
            ->back()
            ->withInput()
            ->withFlashError($this->message);
    }
}
