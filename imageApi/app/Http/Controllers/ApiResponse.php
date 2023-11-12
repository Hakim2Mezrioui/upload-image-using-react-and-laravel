<?php 

namespace App\Http\Controllers;

trait ApiResponse {
    public function apiResponse($data, $message = null, $status = null) {
        $array = [
            $data=>$data,
            $message=>$message,
            $status=>$status,
        ];

        return $array;
    }
}