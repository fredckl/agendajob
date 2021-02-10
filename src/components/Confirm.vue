<template>
  <b-modal 
    id="confirm" 
    title="Demande de confirmation"
    @ok="$emit('onOk')"
    @hidden="$emit('onClose')"
  >
    <p class="my-4">{{msg}}</p>
  </b-modal>
</template>

<script>
export default {
  props: {
    msg: String,
    onOk: Function
  }
}
</script>

<style>

</style>