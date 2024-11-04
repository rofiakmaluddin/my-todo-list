<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

const label = {
  userId: 'User ID',
  password: 'Password',
};

const formSchema = toTypedSchema(
  z.object({
    id: z.string().min(2).max(50),
    password: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <AuthForm
    title="Login to My Todo List App"
    description="Manage your Todos"
    :onSubmit="onSubmit"
    mode="login"
  >
    <FormInput
      name="id"
      :form="form"
      :label="label.userId"
      :placeholder="label.userId"
    />
    <FormInput
      name="password"
      :form="form"
      :label="label.password"
      :placeholder="label.password"
      type="password"
    />
  </AuthForm>
</template>
