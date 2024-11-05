<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { login } from '~/apis/auth';
import { useToast } from '~/components/ui/toast';

const { toast } = useToast();
const router = useRouter();

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

const mutation = useMutation({
  mutationFn: login,
  onSuccess: (data) => {
    toast({
      title: 'You are logged in',
      description: 'Manage your todo now',
    });
    router.push('/');
  },
  onError(error: any) {
    toast({
      title: error.response.data.statusMessage,
      variant: 'destructive',
    });
  },
});

const onSubmit = form.handleSubmit((values) => {
  mutation.mutate(values);
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
