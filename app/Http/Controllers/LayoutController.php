<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class LayoutController extends Controller
{
    public function index(){
        return route('home');
       }
}
