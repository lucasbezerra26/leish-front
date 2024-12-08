<template>
  <div class="card flex justify-center">
    <Drawer
      v-model:visible="visible"
      :dismissable="isOnMobile"
      :show-close-icon="isOnMobile"
      :pt="layoutDrawer"
    >
      <template #header>
        <div class="flex items-center justify-between px-6 pt-4 shrink-0">
          <span class="inline-flex items-center gap-2">
            <Avatar
              image="/src/assets/img/logo.png"
              shape="circle"
              class="logo-app"
            />
            <span class="font-semibold text-2xl text-primary">
              {{ appName }}
            </span>
          </span>
        </div>
      </template>
      <div class="flex flex-col h-full">
        <div class="overflow-y-auto">
          <ul class="list-none p-4 m-0">
            <li>
              <ul class="list-none p-0 m-0 overflow-hidden">
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-home mr-2"></i>
                    <span class="font-medium">Home</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="list-none p-4 m-0">
            <li>
              <div
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterFromClass: 'hidden',
                  enterActiveClass: 'animate-slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'animate-slideup',
                }"
                class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
              >
                <span class="font-medium">LAMINAS</span>
                <i class="pi pi-chevron-down"></i>
              </div>
              <ul class="list-none p-0 m-0 overflow-hidden">
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-list mr-2"></i>
                    <span class="font-medium">Listar</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-plus-circle mr-2"></i>
                    <span class="font-medium">Nova Lâmina</span>
                  </a>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-camera mr-2"></i>
                    <span class="font-medium">Captura Local</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Drawer>

    <MegaMenu class="p-4 bg-surface-0 min-w-full" style="border-radius: 3rem">
      <template #start>
        <Button icon="pi pi-bars m-2" @click="visible = !visible" />
      </template>

      <template #end>
        <div
          class="flex items-center justify-center m-2 bg-gray-300 rounded-full h-14 w-14"
        >
          <Avatar
            v-if="user.avatar"
            :image="user.avatar"
            shape="circle"
            class="h-10 w-10"
          />
          <Avatar
            v-else
            :label="user.name[0]"
            shape="circle"
            class="h-10 w-10"
          />
        </div>
      </template>
    </MegaMenu>
  </div>
  <div class="bg-neutral-light">
    <router-view />
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted, onUnmounted } from 'vue'

const { appContext } = getCurrentInstance()
const appName = appContext.config.globalProperties.appName

const visible = ref(true)
const layoutDrawerDefault = ref({
  mask: {
    class: 'flex-initial',
    style: 'position: relative; width: unset;',
  },
})

const layoutDrawer= ref(layoutDrawerDefault.value)

let user = ref({
  name: 'Usuário',
  email: '-',
  avatar: null,
})

// Estado para detectar dispositivo móvel
const isOnMobile = ref(false)

// Função para lidar com o redimensionamento
const onResize = () => {
  if (window.innerWidth <= 767) {
    isOnMobile.value = true
    layoutDrawer.value = {
      mask: {
        class: '',
        style: 'background-color: #FFFFFF; width: unset;',
      },
    }
  } else {
    isOnMobile.value = false
    layoutDrawer.value = layoutDrawerDefault.value
    console.log('layoutDrawer', layoutDrawer.value)
    console.log('layoutDrawerDefault.value', layoutDrawerDefault.value)
  }
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped></style>
