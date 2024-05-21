<?php $__env->startSection('content'); ?>
    <section class="login">
        <header class="login__header">
            <h2 class="login__title">Авторизация</h2>
        </header>
        <div class="login__wrapper">
            <form class="login__form" action="<?php echo e(route('login')); ?>" method="POST"
                  accept-charset="utf-8">
                <?php echo csrf_field(); ?>

                <label class="login__label" for="email">
                    E-mail
                    <input class="login__input" type="email" placeholder="example@domain.xyz" name="email" required>
                </label>
                <label class="login__label" for="pwd">
                    Пароль
                    <input class="login__input" type="password" placeholder="" name="password" required>
                </label>
                <div class="text-center">
                    <input value="Авторизоваться" type="submit" class="login__button">
                </div>
            </form>
        </div>
    </section>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Learn\diplom-v2\diplom\resources\views/auth/login.blade.php ENDPATH**/ ?>