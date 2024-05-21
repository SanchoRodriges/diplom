<?php $__env->startSection('content'); ?>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/js/App.js', 'resources/sass/app.scss']); ?>
    <div id="admin"></div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Learn\diplom-v2\diplom\resources\views/admin.blade.php ENDPATH**/ ?>