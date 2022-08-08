<template>
    <footer class="footer">
        <div class="footer__content">
            <slot></slot>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    height: 56px;
    background-color: var(--on-primary);
}
.footer__content {
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: end;
    align-items: end;
}
</style>