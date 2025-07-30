<template>
    <section class="max-w-7xl mx-auto flex">
      <div class="w-1/3 pr-4">
        <slot name="sidebar" />
      </div>
      <div class="w-2/3 pl-4 ricoooo">
        <slot name="main" />
      </div>
    </section>
</template>