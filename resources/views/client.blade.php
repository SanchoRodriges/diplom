@extends('layouts.app')

@section('content')
    @vite(['resources/js/App.js', 'resources/sass/app.scss'])
    <div id="client"></div>
@endSection
