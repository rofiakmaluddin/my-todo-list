<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

const label = {
  userId: 'User ID',
  name: 'Name',
  password: 'Password',
};

const formSchema = toTypedSchema(
  z.object({
    id: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(50, { message: 'Password cannot exceed 50 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[@$!%*?&#]/, {
        message:
          'Password must contain at least one special character (@$!%*?&#)',
      }),
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
    title="Register to My Todo List App"
    description="Create your account and Manage your Todos"
    :onSubmit="onSubmit"
    mode="register"
  >
    <FormInput
      name="id"
      :form="form"
      :label="label.userId"
      :placeholder="label.userId"
    />
    <FormInput
      name="name"
      :form="form"
      :label="label.name"
      :placeholder="label.name"
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
