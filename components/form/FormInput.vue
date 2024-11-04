<script setup lang="ts">
import type { FormContext } from 'vee-validate';

withDefaults(
  defineProps<{
    name: string;
    form: FormContext;
    label?: string;
    placeholder?: string;
    description?: string;
    type?: string;
  }>(),
  {
    type: 'text',
  }
);
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :name="name"
    :validate-on-blur="form.isFieldDirty"
  >
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input
          :type="type"
          :placeholder="placeholder"
          v-bind="componentField"
        />
      </FormControl>
      <FormDescription>{{ description }}</FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
