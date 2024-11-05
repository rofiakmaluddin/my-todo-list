<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import dayjs from 'dayjs';
import { CheckCircle, Circle, Trash2 } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { create, get, mark, remove } from '~/apis/todo';
import { Skeleton } from '~/components/ui/skeleton';
import { useToast } from '~/components/ui/toast';

const { toast } = useToast();

const isOpen = ref(false);

const { data, refetch, isLoading } = useQuery({
  queryKey: ['todos'],
  queryFn: get,
});

const label = {
  subject: 'Subject',
  description: 'Description',
};

const formSchema = toTypedSchema(
  z.object({
    subject: z.string(),
    description: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const deleteMutation = useMutation({
  mutationFn: remove,
  onSuccess: () => {
    toast({
      title: 'Todo deleted',
    });
    refetch();
  },
});

const markMutation = useMutation({
  mutationFn: mark,
  onSuccess: () => {
    toast({
      title: 'Todo marked',
    });
    refetch();
  },
});

const mutation = useMutation({
  mutationFn: create,
  onSuccess: () => {
    toast({
      title: 'Todo added',
    });
    isOpen.value = false;
    refetch();
  },
});

const onSubmit = form.handleSubmit((values) => {
  mutation.mutate(values);
});
</script>

<template>
  <Card class="w-[500px]">
    <CardHeader>
      <div class="flex justify-between">
        <div>
          <CardTitle class="text-2xl">Today's Task</CardTitle>
          <CardDescription>
            {{ dayjs(new Date()).format('dddd, D MMMM') }}
          </CardDescription>
        </div>

        <Dialog v-model:open="isOpen">
          <DialogTrigger> <Button> + New task </Button></DialogTrigger>
          <DialogContent class="w-full">
            <AuthForm
              title="Add New Task"
              description="You need to commit with your task"
              :onSubmit="onSubmit"
              class="w-full"
            >
              <FormInput
                name="subject"
                :form="form"
                :label="label.subject"
                :placeholder="label.subject"
              />
              <FormInput
                name="description"
                :form="form"
                :label="label.description"
                :placeholder="label.description"
              />
            </AuthForm>
          </DialogContent>
        </Dialog>
      </div>
    </CardHeader>

    <CardContent class="space-y-3">
      <Skeleton
        v-if="isLoading"
        v-for="x in 3"
        :key="x"
        class="w-full h-[100px]"
      />

      <div v-if="!data?.data.length && !isLoading" class="text-center">
        No data
      </div>

      <Card v-for="todo in data?.data" :key="todo.activities_no" class="w-full">
        <CardHeader>
          <div class="flex justify-between items-center">
            <div>
              <CardTitle
                :class="[
                  'text-lg',
                  todo.status !== 'Unmarked' && 'line-through',
                ]"
              >
                {{ todo.subject }}
              </CardTitle>
              <CardDescription>
                {{ todo.description }}
              </CardDescription>
            </div>
            <div class="flex gap-2">
              <CheckCircle
                v-if="todo.status !== 'Unmarked'"
                color="green"
                class="hover:scale-110 duration-200 cursor-pointer"
                @click="
                  () =>
                    markMutation.mutate({
                      activities_no: todo.activities_no,
                      status: 'Unmarked',
                    })
                "
              />
              <Circle
                v-else
                class="hover:scale-110 duration-200 cursor-pointer"
                @click="
                  () =>
                    markMutation.mutate({
                      activities_no: todo.activities_no,
                      status: 'Marked',
                    })
                "
              />
              <Trash2
                v-if="todo.status === 'Unmarked'"
                color="red"
                class="hover:scale-110 duration-200 cursor-pointer"
                @click="() => deleteMutation.mutate(todo.activities_no)"
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    </CardContent>
  </Card>
</template>
