<template>
  <div class="p-6 container-xl flex items-center justify-between flex-col">
    <!-- Cabeçalho -->
    <div class="flex items-center justify-between w-full flex-col">
      <div class="flex items-center">
        <h5 class="text-xl font-semibold text-primary text-center">
          Classificação de Imagens de LV Humana
        </h5>
      </div>
    </div>
    <!-- Seletor de Câmera -->
    <div class="flex flex-col w-full items-center justify-center">
      <div class="w-full lg:w-1/2 flex justify-center">
        <div class="camera bg-gray-200 rounded-md w-full h-96">
          <video ref="video" autoplay class="rounded-md w-full h-full">
            Video não disponível.
          </video>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-1/2">
      <div class="text-center">
        <label for="cameraSelect" class="font-medium">Selecionar Câmera</label>
        <Dropdown
          :options="videoDevices"
          optionLabel="label"
          v-model="selectedCamera"
          @change="changeCamera"
          class="w-full mt-2"
        />
      </div>
    </div>

    <!-- Console de Dados -->
    <div class="mt-6 w-full lg:w-1/2 mx-auto">
      <Textarea v-model="receivedData" rows="5" class="w-full" readonly />
    </div>

    <!-- Botões de Controle -->
    <div class="mt-8 text-center">
      <div v-if="isInicio">
        <Button
          label="Iniciar"
          icon="pi pi-play"
          @click="connectSerialPort"
          class="p-button-primary m-2"
        />
        <Button
          label="Voltar"
          icon="pi pi-arrow-left"
          class="p-button-secondary m-2"
        />
      </div>
      <div v-else>
        <div v-if="showMenu">
          <div class="flex flex-wrap justify-center gap-4">
            <Button
              label="Configurar"
              icon="pi pi-cog"
              class="p-button-primary"
              @click="writeSerial('configurar')"
            />
            <Button
              label="Capturar"
              icon="pi pi-camera"
              class="p-button-success"
              @click="startCapture"
            />
            <Button
              label="Testar"
              icon="pi pi-check"
              class="p-button-warning"
              @click="writeSerial('testar')"
            />
          </div>
          <div class="mt-4">
            <h5>Controle de Passos:</h5>
            <div class="flex flex-wrap justify-center gap-4">
              <Button
                label="Positivo"
                icon="pi pi-plus"
                class="p-button-info"
                @click="writeSerial('positivo')"
              />
              <Button
                label="Negativo"
                icon="pi pi-minus"
                class="p-button-danger"
                @click="writeSerial('negativo')"
              />
              <Button
                label="OK"
                icon="pi pi-check"
                class="p-button-secondary"
                @click="writeSerial('ok')"
              />
            </div>
          </div>
          <div class="mt-4">
            <Checkbox v-model="saveLocal" binary class="mr-2" />
            <label for="saveLocal">Salvar localmente</label>
          </div>
        </div>
        <Button
          label="Finalizar"
          icon="pi pi-stop"
          class="p-button-danger mt-4"
          @click="disconnectSerialPort"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const videoDevices = ref([])
const selectedCamera = ref(null)
const receivedData = ref('')
const isInicio = ref(true)
const showMenu = ref(false)
const saveLocal = ref(true)

let currentStream = null
let port = null
let reader = null

const getCameras = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  videoDevices.value = devices
    .filter(device => device.kind === 'videoinput')
    .map((device, index) => ({
      label: device.label || `Câmera ${index + 1}`,
      value: device.deviceId,
    }))
  if (videoDevices.value.length > 0) {
    selectedCamera.value = videoDevices.value[0].value
    startCamera()
  }
}

const startCamera = async () => {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop())
  }
  try {
    currentStream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: selectedCamera.value
          ? { exact: selectedCamera.value }
          : undefined,
      },
    })
    const videoElement = document.querySelector('video')
    console.log(currentStream)
    videoElement.srcObject = currentStream
    videoElement.play()
  } catch (error) {
    console.error('Erro ao acessar a câmera:', error)
  }
}

const changeCamera = () => {
  startCamera()
}

const connectSerialPort = async () => {
  try {
    port = await navigator.serial.requestPort()
    await port.open({ baudRate: 9600 })
    isInicio.value = false
    readSerialData()
  } catch (error) {
    console.error('Erro ao conectar à porta serial:', error)
  }
}

const writeSerial = async data => {
  try {
    const writer = port.writable.getWriter()
    const encoder = new TextEncoder()
    await writer.write(encoder.encode(`${data}\n`))
    writer.releaseLock()
  } catch (error) {
    console.error('Erro ao escrever na porta serial:', error)
  }
}

const readSerialData = async () => {
  reader = port.readable.getReader()
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      const incomingData = new TextDecoder().decode(value)
      receivedData.value += incomingData

      if (receivedData.value.includes('menu')) {
        showMenu.value = true
        receivedData.value = ''
      }
    }
  } catch (error) {
    console.error('Erro ao ler dados da porta serial:', error)
  } finally {
    reader.releaseLock()
  }
}

const disconnectSerialPort = async () => {
  if (reader) {
    await reader.cancel()
    reader.releaseLock()
  }
  if (port) {
    await port.close()
  }
  isInicio.value = true
}

onMounted(() => {
  getCameras()
})
</script>

<style scoped>
.camera {
  background-color: #eaeaea;
}
</style>
