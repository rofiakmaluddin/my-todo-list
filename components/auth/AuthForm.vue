<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  onSubmit: (e?: Event) => Promise<void | undefined>;
  mode?: 'login' | 'register';
}>();
</script>

<template>
  <Card class="w-[500px]">
    <CardHeader>
      <CardTitle class="text-2xl">{{ title }}</CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form class="w-full space-y-4 bg-white mb-5" @submit="onSubmit">
        <slot />
        <Button type="submit"> Submit </Button>
      </form>
      <NuxtLink v-if="mode === 'register'" to="/auth/login">
        Already have an account? Login here.
      </NuxtLink>
      <NuxtLink v-else-if="mode === 'login'" to="/auth/register">
        Don't have an account? Register here.
      </NuxtLink>
    </CardContent>
  </Card>
</template>
